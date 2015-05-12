<?php

namespace Egis\Bundle\ExtJsBundle\Ext;

/**
 * ExtFilter
 * Definition de la classe ExtFilter utilisée pour modelisé un filtre de ExtJs
 * @package    DataBundle
 * @subpackage ExtFilter
 * @author     Loïc Lecuyer
 */
class ExtFilter {

    /** @var string Nom de la propriété */
    private $property;
    /** @var string Valeur du filtre */
    private $value;
    /** @var string Opérateur du filtre */
    private $operator;
    
    /**
     * Construit un filtre ExtJs
     * @param string $property Nom de la propriété
     * @param mixed $value Valeur du filtre
     * @param string $operator Opérateur du filtre, itinitalisé à = si non présent 
     * @todo gérer les opérateurs autorisé en fonction du type de la propriété
     */
    function __construct($property,$value,$operator="=") {
        //
        if (!is_string($property))
        {
            throw new \InvalidArgumentException("L'argument property n'est pas une chaine texte",200);
        }
        if (!is_string($operator))
        {
            throw new \InvalidArgumentException("L'argument operator n'est pas une chaine texte",200);
        }
        $this->property = $property;
        $this->value = $value;
        $this->operator = $operator;
    }
    /**
    * @return string Nom de la propriété
    */
    public function getProperty()
    {
        return $this->property;
    }
    /**
    * @return mixed Valeur du filtre
    */
    public function getValue()
    {
        return $this->value;
    }
    /**
    * @return string Opérateur du filtre
    */
    public function getOperator()
    {
        return $this->operator;
    }

}
