<?php

namespace Egis\Bundle\ExtJsBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class RestController extends ContainerAware {

    /**
     * Met à jour une entité , les données sont passé au format Json
     * Elle sont récupérer de la requête et utilisé pour valorisé les propriétés de l'entités
     * @param string $table nom de l'entité dans le repository
     * @return Response symfony
     * @todo Gestion d'erreurs
     */
    public function updateAction($schema, $table) {

        if ($this->validateTableWriteRight($schema, $table) === false) {
            throw new AccessDeniedException();
        }
        // Récupération de la requête
        $request = $this->container->get('request');

        // Conversion du contenu brut en tableau JSon
        $content = $request->getContent();
        $datas = $this->getRequestJson($content);
        $results = [];
        for ($i = 0; $i < count($datas); $i++) {
            $data = $datas[$i];
            // Extraction de l'indentifiant
            $id = $this->extractId($data);

            // Création de la requête DQL pour récupéré l'entité
            $em = $this->container->get('doctrine')->getEntityManager();
            $repository = $this->container->get('doctrine')->getRepository("Egis\Bundle\AmsData" . $schema . "Bundle\Entity\\" . $table);
            $queryBuilder = $repository->createQueryBuilder('tblMain');
            $queryBuilder->where("tblMain.id = ?0")->setParameters([$id]);
            $query = $queryBuilder->getQuery();
            $items = $query->getResult();
            $item = $items[0];

            // mise à jour de l'entité
            $item->setJson($data, $em);
            $em->persist($item);
            array_push($results, $item->getJson($em));
        }

        $em->flush();

        // Renvoie de la réponse
        $response = $this->createJsonResponse($results, true, count($results), "ok");
        return $response;
    }

    /**
     * Supprime une entité , les données sont passé au format Json
     * Elle sont récupérer de la requête seul le paramètre id est néssécaire
     * @param string $table nom de l'entité dans le repository
     * @return Response symfony
     * @todo Gestion d'erreurs
     */
    public function deleteAction($schema, $table) {

        if ($this->validateTableWriteRight($schema, $table) === false) {
            throw new AccessDeniedException();
        }
        // Récupération de la requête
        $request = $this->container->get('request');

        // Conversion du contenu brut en tableau JSon
        $content = $request->getContent();
        $datas = $this->getRequestJson($content);

        for ($i = 0; $i < count($datas); $i++) {
            $data = $datas[$i];
            // Extraction de l'indentifiant
            $id = $this->extractId($data);
            // Création de la requête DQL pour récupéré l'entité
            $em = $this->container->get('doctrine')->getEntityManager();
            $repository = $this->container->get('doctrine')->getRepository("Egis\Bundle\AmsData" . $schema . "Bundle\Entity\\" . $table);
            $queryBuilder = $repository->createQueryBuilder('tblMain');
            $queryBuilder->where("tblMain.id = ?0")->setParameters([$id]);
            $query = $queryBuilder->getQuery();
            $items = $query->getResult();
            $item = $items[0];
            // Supression de l'entité
            $em->remove($item);
        }
        $em->flush();
        // Renvoie de la réponse
        $response = $this->createJsonResponse([], true, count($datas), "ok");
        return $response;
    }

    /**
     * Cré une entité , les données sont passé au format Json
     * Elle sont récupérer de la requête et utilisé pour valorisé les propriétés de l'entités
     * Si le propriété id est passé elle est ignoré pour forcer l'utilisation de la séquence par Doctrine
     * @param string $table nom de l'entité dans le repository
     * @return Response symfony
     * @todo Gestion d'erreurs
     */
    public function createAction($schema, $table) {

        if ($this->validateTableWriteRight($schema, $table) === false) {
            throw new AccessDeniedException();
        }
        // Récupération de la requête
        $request = $this->container->get('request');

        // Conversion du contenu brut en tableau JSon
        $content = $request->getContent();
        $datas = $this->getRequestJson($content);
        $results = [];
        for ($i = 0; $i < count($datas); $i++) {
            $data = $datas[$i];
            // supression du paramètre id sil il est présent pour s'assurer que ce seras la sequence qui seras utilisé
            if (isset($data["id"])) {
                unset($data["id"]);
            }

            // Création de l'entité
            $className = "Egis\Bundle\AmsData" . $schema . "Bundle\Entity\\" . $table;
            $em = $this->container->get('doctrine')->getEntityManager();
            $item = new $className();
            $item->setJson($data, $em);
            // Sauvegarde de l'entité
            $em->persist($item);
            array_push($results, $item->getJson($em));
        }

        $em->flush();

        // Renvoie de la réponse
        $response = $this->createJsonResponse($results, true, count($results), "ok");
        return $response;
    }

    public function validateTableWriteRight($schema, $table) {
        $result = false;
        $session = new Session();
        $rights = $session->get("rights");
        if (array_key_exists($schema, $rights)) {
            $schemaRights = $rights[$schema];
            if (array_key_exists("tables", $schemaRights)) {
                for ($i = 0; $i < count($schemaRights["tables"]); $i++) {
                    $tableRight = $schemaRights["tables"][$i];
                    if ($tableRight["tableName"] === $table) {
                        if ($tableRight["allowWrite"] === true) {
                            $result = true;
                        }
                    }
                }
            }
        }
        return $result;
    }

    public function validateTableShowRight($schema, $table) {
        $result = false;
        $session = new Session();
        $rights = $session->get("rights");
         //var_dump($rights);
        if (array_key_exists($schema , $rights)) {
            $schemaRights = $rights[$schema];
           // var_dump($schemaRights);
            if (array_key_exists("tables", $schemaRights)) {
                for ($i = 0; $i < count($schemaRights["tables"]); $i++) {
                    $tableRight = $schemaRights["tables"][$i];
                    if ($tableRight["tableName"] === $table) {
                        if ($tableRight["allowShow"] === true) {
                            $result = true;
                        }
                    }
                }
            }
        }
        // var_dump($rights);
        return $result;
    }

    /**
     * Liste des entitées , les données sont passé au format Json
     * Elle sont récupérer de la requête et utilisé pour valorisé les filtres, les trie , la pagination , les tables parent et les tables enfants
     * @param string $table nom de l'entité dans le repository
     * @return Response symfony
     * @todo Gestion d'erreurs
     */
    public function readAction($schema, $table) {

        if ($this->validateTableShowRight($schema, $table) === false) {
            throw new AccessDeniedException();
        }
        //  throw new AccessDeniedException();
        // Récupération de la requête
        $request = $this->container->get('request');

        // Parsing des filtres ExtJs
        $filterCollection = new \Egis\Bundle\ExtJsBundle\Ext\ExtFilterCollection();
        $filterParameter = $request->query->get('filter');
        if ($filterParameter !== null) {
            $filterCollection = \Egis\Bundle\ExtJsBundle\Ext\ExtFilterCollection::parseRequestFilters($filterParameter);
        }

        // Si un paramètres id est fournit on ajout un filtre sur l'id
        $idParameter = $request->query->get('id');
        if ($idParameter !== null) {
            $filterCollection->addFilter(new \Egis\Bundle\ExtJsBundle\Ext\ExtFilter("id", $idParameter));
        }

        // Parsing des tries ExtJs
        $sorterParameter = $request->query->get('sort');
        $sorterCollection = new \Egis\Bundle\ExtJsBundle\Ext\ExtSorterCollection();
        if ($sorterParameter !== null) {
            $sorterCollection = \Egis\Bundle\ExtJsBundle\Ext\ExtSorterCollection::parseRequestSorters($sorterParameter);
        }


        // Parsing des table parent à ajouté à la requête
        $needestParentTable = $request->query->get('needestParentTables');
        $needestParentTables = $this->parseNeedestTables($needestParentTable);

        // Parsing des tables enfants à ajouter pour chaque enregistrement
        $needestChildTable = $request->query->get('needestChildTables');
        $needestChildTables = $this->parseNeedestTables($needestChildTable);

        // Parsing de la pagination ExtJs
        $startParameter = $request->query->get('start');
        $limitParameter = $request->query->get('limit');
        $pagination = null;
       
        if ($startParameter !== null && $limitParameter !== null) {
             $pagination = new \Egis\Bundle\ExtJsBundle\Ext\ExtPagination($startParameter, $limitParameter);
        }


        // Création de la requête DQL
        $em = $this->container->get('doctrine')->getEntityManager();
        $queryBuilder = $em->createQueryBuilder();
        $queryBuilder->select('tblMain')->from("Egis\Bundle\AmsData" . $schema . "Bundle\Entity\\" . $table, 'tblMain');

        // Application des filtres
        if ($filterCollection !== null) {
            $filterCollection->applyFilters($queryBuilder, 'tblMain');
        }


        // Application des tries
        $sorterCollection->applySorters($queryBuilder, 'tblMain');

        $items = null;
      
        // Récupération des enregistrement paginé
        if ($pagination === null) {
            
            $items = $queryBuilder->getQuery()->getResult();
            
        } else {
          
            $items = $pagination->getResult($queryBuilder);
           
        }
        $count = count($items);
        // Lecture des enregistrements
        $datas = $this->readData($em, $items, $needestParentTables, $needestChildTables);

        // Création de la réponse
        $response = $this->createJsonResponse($datas, true,$count, "Ok");

        return $response;
    }

    /**
     * Convertir de contenu brut de la requête en tableau Json  
     * @param string $requestContent contenu brut de la requête
     * @return array Tableau Json
     * @todo Gestion d'erreurs
     */
    public function getRequestJson($requestContent) {
        $data = json_decode($requestContent);
        $jsonDatas = null;
        if (is_array($data)) {
            $jsonDatas = [];
            for ($i = 0; $i < count($data); $i++) {
                $jsonData = get_object_vars($data[$i]);
                array_push($jsonDatas, $jsonData);
            }
        } else {
            $jsonDatas = [get_object_vars($data)];
        }

        return $jsonDatas;
    }

    /**
     * Extrait la valeur de l'identifiant d'un objet Json
     * @param array $jsonData donnée Json
     * @return int Identifiant
     * @todo Gestion d'erreurs
     */
    public function extractId($jsonData) {
        if (isset($jsonData["id"])) {
            return intval($jsonData["id"]);
        } else {
            return null;
        }
    }

    /**
     * Extrait la valeur de l'identifiant d'un objet Json
     * @param array $datas donnée Json
     * @param bool $success true si la requête est un succès
     * @param int $total nombre total d'entité disponible (hors pagination)
     * @param string $message message d'information
     * @return Response Réponse symfony au contenu Json
     * @todo Gestion d'erreurs
     */
    public function createJsonResponse($datas, $success, $total, $message) {
        $json = [];
        $json['datas'] = $datas;
        $json['success'] = $success;
        $json['total'] = $total;
        $json['message'] = $message;
        $response = new Response();
        $response->setContent(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Lit les données des entitées dans un tableau JSon
     * @param EntityManager $em donnée Gestionnaire des entitées
     * @param array $items tableau des entitées
     * @param array $needestParentTables table parent à lire
     * @param array $needestChildTables table enfant à lire
     * @return array Tableau Json contenant les données de l'entité
     * @todo Gestion d'erreurs
     */
    public function readData($em, $items, $needestParentTables, $needestChildTables) {
        $datas = [];
        foreach ($items as $item) {
            $jsonItem = $item->getJson($em);
            $this->readParentData($em, $item, $needestParentTables, $jsonItem);
            $this->readChildData($em, $item, $needestChildTables, $jsonItem);
            array_push($datas, $jsonItem);
        }
        return $datas;
    }

    /**
     * Lit les données parente d'une entité et les affecte à l'objet Json
     * @param EntityManager $em donnée Gestionnaire des entitées
     * @param array $item entitée
     * @param array $needestParentTables table parent à lire
     * @todo Géré l'existance ou nom des entités parente et lancer une exception si ce n'est pas le cas de même pour le getter
     */
    public function readParentData($em, $item, $needestParentTables, $jsonItem) {
        for ($i = 0; $i < count($needestParentTables); $i++) {
            $getter = 'get' . $needestParentTables[$i];
            $parentItem = $item->$getter();
            $jsonKeyName = strtolower(substr($needestParentTables[$i], 0, 1)) . substr($needestParentTables[$i], 1);
            if ($parentItem !== null) {
                $jsonItem[$jsonKeyName] = $parentItem->getJson($em);
            } else {
                $jsonItem[$jsonKeyName] = null;
            }
        }
    }

    /**
     * Lit les données enfants d'une entité et les affecte à l'objet Json
     * @param EntityManager $em donnée Gestionnaire des entitées
     * @param array $item entitée
     * @param array $needestChildTables table enfant à lire
     * @todo Géré l'existance ou nom des entités enfants et lancer une exception si ce n'est pas le cas de même pour le getter
     */
    public function readChildData($em, $item, $needestChildTables, $jsonItem) {
        for ($i = 0; $i < count($needestChildTables); $i++) {
            $getter = 'get' . $needestChildTables[$i] . "s";
            $childItems = $item->$getter();
            $jsonKeyName = strtolower(substr($needestChildTables[$i], 0, 1)) . substr($needestChildTables[$i], 1) . "s";
            $childJsons = [];
            foreach ($childItems->toArray() as $childItem) {
                $childJson = $childItem->getJson($em);
                array_push($childJsons, $childJson);
            }
            $jsonItem[$jsonKeyName] = $childJsons;
        }
    }

    /**
     * Transforme un chaine représantant des entitées néssécaire un tableau
     * @param String $needestTables Chaine de caractères contenant une liste d'entité spéaré par des pipe (|)
     * @return array Tableau des entités néssécaire
     * @todo Géré l'existance ou nom des entités et lancer une exception si ce n'est pas le cas
     */
    public function parseNeedestTables($needestTables) {
        if ($needestTables !== null && $needestTables !== '') {
            return explode('|', $needestTables);
        } else {
            return [];
        }
    }

}
