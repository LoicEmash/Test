<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_sch")
*/
class PrfSch
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_sch_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="string", name="schema", nullable=false)
	*/
	protected $schema;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=false)
	*/
	protected $lib;
	
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfTabl", mappedBy="prfSch")
	**/
	protected $prfTabls;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfProf", mappedBy="prfSch")
	**/
	protected $prfProfs;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfFct", mappedBy="prfSch")
	**/
	protected $prfFcts;
	
	public function __construct() {
	$this->prfTabls = new \Doctrine\Common\Collections\ArrayCollection();
	$this->prfProfs = new \Doctrine\Common\Collections\ArrayCollection();
	$this->prfFcts = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getSchema()
	{
		return $this->schema;
	}
	
	public function setSchema($value)
	{
		$this->schema= $value;
	}
	
	public function getLib()
	{
		return $this->lib;
	}
	
	public function setLib($value)
	{
		$this->lib= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["schema"] = $this->getSchema();
		$json["lib"] = $this->getLib();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["schema"]))
		{
			$this->setSchema($json["schema"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
	}
	
	public function getPrfTabls()
	{
		return $this->prfTabls;
	}
	public function getPrfProfs()
	{
		return $this->prfProfs;
	}
	public function getPrfFcts()
	{
		return $this->prfFcts;
	}
}
