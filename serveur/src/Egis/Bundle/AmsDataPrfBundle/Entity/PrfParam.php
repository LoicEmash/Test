<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_param")
*/
class PrfParam
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_param_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="string", name="sch", nullable=true)
	*/
	protected $sch;
	
	/**
	* @ORM\Column(type="string", name="code", nullable=false)
	*/
	protected $code;
	
	/**
	* @ORM\Column(type="string", name="valeur", nullable=false)
	*/
	protected $valeur;
	
	
	public function __construct() {
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getSch()
	{
		return $this->sch;
	}
	
	public function setSch($value)
	{
		$this->sch= $value;
	}
	
	public function getCode()
	{
		return $this->code;
	}
	
	public function setCode($value)
	{
		$this->code= $value;
	}
	
	public function getValeur()
	{
		return $this->valeur;
	}
	
	public function setValeur($value)
	{
		$this->valeur= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["sch"] = $this->getSch();
		$json["code"] = $this->getCode();
		$json["valeur"] = $this->getValeur();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["sch"]))
		{
			$this->setSch($json["sch"]);
		}
		if (isset($json["code"]))
		{
			$this->setCode($json["code"]);
		}
		if (isset($json["valeur"]))
		{
			$this->setValeur($json["valeur"]);
		}
	}
	
}
