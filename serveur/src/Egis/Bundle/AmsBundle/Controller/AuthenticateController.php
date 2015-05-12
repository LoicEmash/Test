<?php

namespace Egis\Bundle\AmsBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\DependencyInjection\ContainerAware;

class AuthenticateController extends ContainerAware {

    public function loginAction($login, $password) {

        $em = $this->container->get('doctrine')->getEntityManager();
        $userRepo = $em->getRepository('Egis\Bundle\AmsDataPrfBundle\Entity\PrfUser');
        $qb = $userRepo->createQueryBuilder('a');
        $qb->where('a.login = :id and a.pass = :password')->setParameter('id', $login)->setParameter('password', $password);
        $query = $qb->getQuery();
        $results = $query->getResult();
        if (count($results) === 1) {
            $user = $results[0];
            // On fabrique une clé avec du poivre et du sel
            $apiKey = sha1("EAMS" . $_SERVER['REMOTE_ADDR'] . microtime() . "AMS" . $login . $password);
            $response = new Response();

            $session = new Session();
            $session->set("apiKey", $apiKey);
            $session->set("userName", $login);

            $rights = $this->getUserRights($results[0]->getId(), $em);
           
            $session->set("rights", $rights);
            $dataExtent = $this->getDataExtent($em);
            $session->set("dataExtent", $dataExtent);
            //var_dump($rights);
            //$schemaNames = array_unique($schemaNames);
            $response->setContent(json_encode(array(
                'apiKey' => $apiKey,
                'rights' => $rights,
                'nom' => $user->getNom(),
                'login' => $user->getLogin(),
                'prenom' => $user->getPrenom(),
                'avatar' => $user->getAvatar(),
                'dataExtend' => $dataExtent
            )));


            $response->headers->set('Content-Type', 'application/json');
            return $response;
        } else {
            return new Response("Erreur", 401);
        }
    }
    public function getDataExtent($em)
    {
        $geoRepo = $em->getRepository('Egis\Bundle\AmsDataInfBundle\Entity\InfGeo');
        $query = $geoRepo->createQueryBuilder('a');
        $query->select('MIN(a.x1) AS min_x1,MIN(a.x2) AS min_x2,MIN(a.y1) AS min_y1,MIN(a.y2) AS min_y2,MAX(a.x1) AS max_x1,MAX(a.x2) AS max_x2,MAX(a.y1) AS max_y1,MAX(a.y2) AS max_y2');
        $results = $query->getQuery()->getResult();
        if (count($results) === 1)
        {
            $result = $results[0];
            $minX = min($result["min_x1"],$result["min_x2"]);
            $minY = min($result["min_y1"],$result["min_y2"]);
            $maxX = max($result["max_x1"],$result["max_x2"]);
            $maxY = max($result["max_y1"],$result["max_y2"]);
            $extent = [];
            $extent["minX"] = $minX;
            $extent["minY"] = $minY;
            $extent["maxX"] = $maxX;
            $extent["maxY"] = $maxY;
            return $extent;
        }
        
        return null;
    }
    public function getUserRights($userId, $em) {
        $rights = [];
        $prfSchRepo = $em->getRepository('Egis\Bundle\AmsDataPrfBundle\Entity\PrfSch');
        $qb = $prfSchRepo->createQueryBuilder('a');
        $query = $qb->getQuery();
        $results = $query->getResult();
        for ($i = 0; $i < count($results); $i++) {
            $result = $results[$i];
            $schemaRights = $this->getUserSchemaRights($userId, $result, $em);
            $rights[$result->getSchema()] = $schemaRights;
        }
        return $rights;
    }

    public function getUserSchemaRights($userId, $schema, $em) {
        $profil = $this->getUserSchemaProfil($userId, $schema->getId(), $em);
        $schemaRights = [];
        $schemaRights["profil"] = $profil->getLib();
        $schemaRights["displayName"] = $schema->getLib();
        $schemaRights["tables"] = $this->getProfilTableRights($profil->getId(), $em);
        $schemaRights["functions"] = $this->getProfilFonctionRights($profil->getId(), $em);
        return $schemaRights;
    }

    public function getUserSchemaProfil($userId, $schemaId, $em) {

        $profUserRepo = $em->getRepository('Egis\Bundle\AmsDataPrfBundle\Entity\PrfProfUser');
        $qb = $profUserRepo->createQueryBuilder('a');
        $qb->where('a.prfUserId = :id')->setParameter('id', $userId);
        $query = $qb->getQuery();
        $results = $query->getResult();
        $schemaProfil = null;
        for ($i = 0; $i < count($results); $i++) {
            $result = $results[$i];
            if ($result->getPrfProf()->getPrfSch()->getId() === $schemaId) {
                $schemaProfil = $result->getPrfProf();
            }
        }
        if ($schemaProfil === null) {
            $schemaProfil = $this->getDefaultSchemaRights($schemaId, $em);
        }
        return $schemaProfil;
    }

    public function getDefaultSchemaRights($schemaId, $em) {
        $profRepo = $em->getRepository('Egis\Bundle\AmsDataPrfBundle\Entity\PrfProf');
        $qb = $profRepo->createQueryBuilder('a');
        $qb->where('a.prfSchId = :id and a.genre = 0')->setParameter('id', $schemaId);
        $query = $qb->getQuery();
        $results = $query->getResult();
        if (count($results) === 1) {
            return $results[0];
        } else {
            //@TODO Exception
            return null;
        }
    }

    public function getProfilFonctionRights($profilId, $em) {
        $prfFctDroiRepo = $em->getRepository('Egis\Bundle\AmsDataPrfBundle\Entity\PrfFctDroi');
        $qb = $prfFctDroiRepo->createQueryBuilder('a');
        $qb->where('a.prfProfId = :id')->setParameter('id', $profilId);
        $query = $qb->getQuery();
        $results = $query->getResult();
        $profilFctRights = [];
        for ($i = 0; $i < count($results); $i++) {
            $result = $results[$i];
            $fct = $result->getPrfFct();
            $fctRight = [];
            $fctRight["functionName"] = $fct->getCod();
            $fctRight["functionDisplayName"] = $fct->getLib();
            $fctRight["exec"] = $result->getExec();

            array_push($profilFctRights, $fctRight);
        }
        return $profilFctRights;
    }

    public function getProfilTableRights($profilId, $em) {


        $prfTablDroiRepo = $em->getRepository('Egis\Bundle\AmsDataPrfBundle\Entity\PrfTablDroi');
        $qb = $prfTablDroiRepo->createQueryBuilder('a');
        $qb->where('a.prfProfId = :id')->setParameter('id', $profilId);
        $query = $qb->getQuery();
        $results = $query->getResult();
        $profilTableRights = [];
        for ($i = 0; $i < count($results); $i++) {
            $result = $results[$i];
            $table = $result->getPrfTabl();
            $tableRight = [];
            $tableRight["tableName"] = $table->getCode();
            $tableRight["tableDisplayName"] = $table->getLib();
            $tableRight["allowShow"] = $result->getShow();
            $tableRight["allowImport"] = $result->getImport();
            $tableRight["allowWrite"] = $result->getWrite();
            array_push($profilTableRights, $tableRight);
        }
        return $profilTableRights;
    }

    public function getProfilsFromUser($userId, $em) {
        $profils = [];
        $profUserRepo = $em->getRepository('Egis\Bundle\AmsDataPrfBundle\Entity\PrfProfUser');
        $qb = $profUserRepo->createQueryBuilder('a');
        $qb->where('a.prfUserId = :id')->setParameter('id', $userId);
        $query = $qb->getQuery();
        $results = $query->getResult();
        for ($i = 0; $i < count($results); $i++) {
            $profUser = $results[$i];
            $profil = $this->getProfil($profUser->getPrfProfId(), $em);
            array_push($profils, $profil);
        }
        return $profils;
    }

    public function getProfil($profilId, $em) {
        $profRepo = $em->getRepository('Egis\Bundle\AmsDataPrfBundle\Entity\PrfProf');
        $qb = $profRepo->createQueryBuilder('a');
        $qb->where('a.id = :id')->setParameter('id', $profilId);
        $query = $qb->getQuery();

        $results = $query->getResult();
        if (count($results) === 1) {

            return $results[0];
        } else {
            return null;
        }
    }

}
