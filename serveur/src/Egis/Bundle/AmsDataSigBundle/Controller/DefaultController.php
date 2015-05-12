<?php

namespace Egis\Bundle\AmsDataSigBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('EgisAmsDataSigBundle:Default:index.html.twig', array('name' => $name));
    }
}
