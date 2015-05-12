<?php

namespace Egis\Bundle\AmsDataInfBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('EgisAmsDataInfBundle:Default:index.html.twig', array('name' => $name));
    }
}
