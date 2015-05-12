<?php

namespace Egis\Bundle\ExtJsBundle\Ext;

/**
 * ExtSorter
 * Definition de la classe ExtSorter utilisée pour modelisé un trie de ExtJs
 * @package    DataBundle
 * @subpackage ExtSorter
 * @author     Loïc Lecuyer
 */
class ExtSorter {

    /** @var string Nom de la propriété */
    private $property;
    /** @var string sens du trie (ASC ou DESC) */
    private $direction;
    
    /**
     * Construit un trie ExtJs
     * @param string $property Nom de la propriété
     * @param string $direction sens du trie (ASC ou DESC)    
     */
    function __construct($property,$direction) {
        $this->property = $property;
        $this->direction = $direction;
    
    }
    /**
    * @return string Nom de la propriété
    */
    public function getProperty()
    {
        return $this->property;
    }
    /**
    * @return string Direction du trie
    */
    public function getDirection()
    {
        return $this->direction;
    }
    
   

}
