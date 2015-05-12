<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_fct")
*/
class PrfFct
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_fct_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="prf_sch__id", nullable=false)
	*/
	protected $prfSchId;
	
	/**
	* @ORM\Column(type="string", name="cod", nullable=false)
	*/
	protected $cod;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=true)
	*/
	protected $lib;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfSch")
	*  @ORM\JoinColumn(name="prf_sch__id", referencedColumnName="id")
	**/
	protected $prfSch;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfFctDroi", mappedBy="prfFct")
	**/
	protected $prfFctDrois;
	
	public function __construct() {
	$this->prfFctDrois = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getPrfSchId()
	{
		return $this->prfSchId;
	}
	
	public function setPrfSchId($value)
	{
		$this->prfSchId= $value;
	}
	
	public function getCod()
	{
		return $this->cod;
	}
	
	public function setCod($value)
	{
		$this->cod= $value;
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
		$json["prfSchId"] = $this->getPrfSchId();
		$json["cod"] = $this->getCod();
		$json["lib"] = $this->getLib();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["prfSchId"]))
		{
			$this->setPrfSchId($json["prfSchId"]);
		}
		if (isset($json["cod"]))
		{
			$this->setCod($json["cod"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
		if (isset($json["prfSchId"]))
		{
			$this->prfSch= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfSch', $json["prfSchId"]);
		}
	}
	
	public function getPrfSch()
	{
		return $this->prfSch;
	}
	public function getPrfFctDrois()
	{
		return $this->prfFctDrois;
	}
}
