<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_appli")
*/
class PrfAppli
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_appli_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=true)
	*/
	protected $lib;
	
	/**
	* @ORM\Column(type="string", name="code", nullable=true)
	*/
	protected $code;
	
	/**
	* @ORM\Column(type="string", name="cle", nullable=true)
	*/
	protected $cle;
	
	
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
	
	public function getLib()
	{
		return $this->lib;
	}
	
	public function setLib($value)
	{
		$this->lib= $value;
	}
	
	public function getCode()
	{
		return $this->code;
	}
	
	public function setCode($value)
	{
		$this->code= $value;
	}
	
	public function getCle()
	{
		return $this->cle;
	}
	
	public function setCle($value)
	{
		$this->cle= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["lib"] = $this->getLib();
		$json["code"] = $this->getCode();
		$json["cle"] = $this->getCle();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
		if (isset($json["code"]))
		{
			$this->setCode($json["code"]);
		}
		if (isset($json["cle"]))
		{
			$this->setCle($json["cle"]);
		}
	}
	
}
