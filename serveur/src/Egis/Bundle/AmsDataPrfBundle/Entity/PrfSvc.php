<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_svc")
*/
class PrfSvc
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_svc_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="prf_ste__id", nullable=false)
	*/
	protected $prfSteId;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=false)
	*/
	protected $lib;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfSte")
	*  @ORM\JoinColumn(name="prf_ste__id", referencedColumnName="id")
	**/
	protected $prfSte;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfPtfo", mappedBy="prfSvc")
	**/
	protected $prfPtfos;
	
	public function __construct() {
	$this->prfPtfos = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getPrfSteId()
	{
		return $this->prfSteId;
	}
	
	public function setPrfSteId($value)
	{
		$this->prfSteId= $value;
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
		$json["prfSteId"] = $this->getPrfSteId();
		$json["lib"] = $this->getLib();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["prfSteId"]))
		{
			$this->setPrfSteId($json["prfSteId"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
		if (isset($json["prfSteId"]))
		{
			$this->prfSte= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfSte', $json["prfSteId"]);
		}
	}
	
	public function getPrfSte()
	{
		return $this->prfSte;
	}
	public function getPrfPtfos()
	{
		return $this->prfPtfos;
	}
}
