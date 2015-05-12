<?php
/*
 * 
 * Controlleur géran le géocodage d'objet
 */
namespace Egis\Bundle\AmsBundle\Controller;

require_once (__DIR__ . '../../../../../../vendor/phayes/geophp/geoPHP.inc');

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\DependencyInjection\ContainerAware;

class GeoDataController extends ContainerAware {

    public function readAction($schema, $table, $apiKey) {

        $session = new Session();
        $dataExtent = $session->get('dataExtent');
        $request = $this->container->get('request');
        $bbox = $request->query->get('bbox');
        $minX = null;
        $minY = null;
        $maxX = null;
        $maxY = null;
        $json = [];
        $json["type"] = "FeatureCollection";
        $features = [];
        $hasBbox = false;
        if ($bbox !== null) {
            $bboxCoords = explode(',', $bbox);
            if (count($bboxCoords) === 4) {
                $minX = min([ floatval($bboxCoords[0]), floatval($bboxCoords[2])]);
                $maxX = max([ floatval($bboxCoords[0]), floatval($bboxCoords[2])]);
                $minY = min([ floatval($bboxCoords[1]), floatval($bboxCoords[3])]);
                $maxY = max([ floatval($bboxCoords[1]), floatval($bboxCoords[3])]);
                $hasBbox = true;
            }
        }
        if ($dataExtent !== null && $hasBbox === true) {
           
            $deMinX = floatval($dataExtent["minX"]);
            $deMinY = floatval($dataExtent["minY"]);
            $deMaxX = floatval($dataExtent["maxX"]);
            $deMaxY = floatval($dataExtent["maxY"]);
         
            if (!($minX <= $deMaxX | $maxX >= $deMinX | $minY <=$deMaxY| $maxY >= $deMinY)) {
                
                $json["features"] = [];
                $crs = [];
                $crs["type"] = "name";
                $crsProperties = [];
                $crsProperties["name"] = "urn:ogc:def:crs:OGC:1.3:CRS84";
                $crs["properties"] = $crsProperties;
                $json["crs"] = $crs;
                $response = new Response();
                $response->setContent(json_encode($json));
                $response->headers->set('Content-Type', 'application/json');
                return $response;
            }
        }

        $em = $this->container->get('doctrine')->getEntityManager();
        $cmf = $em->getMetadataFactory();
        $entityName = "Egis\Bundle\AmsData" . $schema . "Bundle\Entity\\" . $table;
        $class = $cmf->getMetadataFor($entityName);
        $fieldGeom = null;
        $fieldGeoc = null;
        $fieldDeb = null;
        $fieldFin = null;
        $fieldIdChaussee = null;
        foreach ($class->fieldMappings as $fieldMapping) {
            if ($fieldMapping['fieldName'] === 'geom') {
                $fieldGeom = $fieldMapping;
            }
            if ($fieldMapping['fieldName'] === 'geoc') {
                $fieldGeoc = $fieldMapping;
            }
            if ($fieldMapping['fieldName'] === 'deb') {
                $fieldDeb = $fieldMapping;
            }
            if ($fieldMapping['fieldName'] === 'fin') {
                $fieldFin = $fieldMapping;
            }
            if ($fieldMapping['fieldName'] === 'infChausseeId') {
                $fieldIdChaussee = $fieldMapping;
            }
        }
        $canGeocode = ($fieldGeoc !== null && $fieldDeb !== null && $fieldIdChaussee !== null);
        $hasGeom = $fieldGeom !== null;
        $hasFin = $fieldFin !== null;

        if ($canGeocode) {
            $this->geocode($em, $entityName, $fieldGeoc, $fieldIdChaussee, $fieldDeb, $fieldFin);
        }
        
        $queryBuilder = $em->createQueryBuilder();
        $queryBuilder->select(array('tblMain.id', 'tblMain.geom', 'tblMain.geoc'))->from($entityName, 'tblMain');
        $queryBuilder->where("tblMain." . $fieldGeoc["fieldName"] . " is not null or tblMain." . $fieldGeom["fieldName"] . " is not null");
        $items = $queryBuilder->getQuery()->getResult();
        foreach ($items as $item) {
            $jsonItem = $item;
            if ($jsonItem['geom'] !== null) {
                
            } else if ($jsonItem['geoc'] !== null) {
                $geometry = \geoPHP::load($jsonItem['geoc'], 'wkt');
                $addFeature = true;
                if ($hasBbox) {
                    $addFeature = false;
                    $geometryBBox = $geometry->getBBox();
                    if ($geometryBBox["minx"] <= $maxX && $geometryBBox["maxx"] >= $minX && $geometryBBox["miny"] <= $maxY && $geometryBBox["maxy"] >= $minY) {
                        $addFeature = true;
                    }
                }
                if ($addFeature) {
                    $geoJsonWriter = new \GeoJSON();
                    $geoJsonStr = $geoJsonWriter->write($geometry);
                    $geoJsonGeom = get_object_vars(json_decode($geoJsonStr));
                    $geoJson = [];
                    $geoJson["type"] = "Feature";
                    $geoJson["geometry"] = $geoJsonGeom;
                    $properties = [];
                    $properties["id"] = $jsonItem["id"];
                    $geoJson["properties"] = $properties;
                    array_push($features, $geoJson);
                }
            }
        }
        $json["features"] = $features;
        $crs = [];
        $crs["type"] = "name";
        $crsProperties = [];
        $crsProperties["name"] = "urn:ogc:def:crs:OGC:1.3:CRS84";
        $crs["properties"] = $crsProperties;
        $json["crs"] = $crs;

        $response = new Response();
        $response->setContent(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function geocode($em, $entityName, $fieldGeoc, $fieldIdChaussee, $fieldDeb, $fieldFin) {

        $queryBuilder = $em->createQueryBuilder();
        $queryBuilder->select('tblMain')->from($entityName, 'tblMain');
        $queryBuilder->where("tblMain." . $fieldGeoc["fieldName"] . " is null");
        $items = $queryBuilder->getQuery()->getResult();

        foreach ($items as $item) {
            $jsonItem = $item->getJson($em);
            $chausseeId = $jsonItem[$fieldIdChaussee['fieldName']];
            $deb = $jsonItem[$fieldDeb['fieldName']];
            $fin = null;
            if ($fieldFin !== null) {
                $fin = $jsonItem[$fieldFin['fieldName']];
            }
            $geoc = null;
            if ($chausseeId !== null && $deb !== null) {
                if ($fin !== null) {
                    $geoc = $this->geocodeMultiLine($em, $chausseeId, $deb, $fin);
                } else {

                    $geoc = $this->geocodePoint($em, $chausseeId, $deb);
                    if ($geoc !== null) {
                        $jsonItem['geoc'] = $geoc;
                        $item->setJson($jsonItem, $em);
                        $em->persist($item);
                    }
                }
            }
        }
        $em->flush();
    }

    public function geocodeMultiLine($em, $chausseeId, $deb, $fin) {
        return null;
    }

    public function geocodePoint($em, $chausseeId, $deb) {
        $entityName = "Egis\Bundle\AmsDataInfBundle\Entity\InfGeo";
        $queryBuilder = $em->createQueryBuilder();
        $queryBuilder->select('tblMain')->from($entityName, 'tblMain');
        $queryBuilder->where("tblMain.infChausseeId = " . $chausseeId . " and " . $deb . " >= tblMain.deb and " . $deb . " <= tblMain.fin");
        $items = $queryBuilder->getQuery()->getResult();
        if (count($items) > 0) {
            $item = $items[0];
            $json = $item->getJson($em);
            $lng = (floatVal($json['fin']) - floatVal($json['deb']));
            if ($lng > 0) {
                $delta = (floatVal($json['fin']) - floatVal($deb));
                $coeff = $delta / $lng;
                $deltaX = floatVal($json['x2']) - floatVal($json['x1']);
                $deltaY = floatVal($json['y2']) - floatVal($json['y1']);
                $x = floatVal($json['x1']) + ($deltaX * $coeff);
                $y = floatVal($json['y1']) + ($deltaY * $coeff);
                return "POINT(" . $x . " " . $y . ")";
            }
        }
        return null;
    }

}
