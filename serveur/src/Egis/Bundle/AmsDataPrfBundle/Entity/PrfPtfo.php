<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_ptfo")
*/
class PrfPtfo
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_ptfo_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="prf_svc__id", nullable=false)
	*/
	protected $prfSvcId;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=false)
	*/
	protected $lib;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfSvc")
	*  @ORM\JoinColumn(name="prf_svc__id", referencedColumnName="id")
	**/
	protected $prfSvc;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfUser", mappedBy="prfPtfo")
	**/
	protected $prfUsers;
	
	public function __construct() {
	$this->prfUsers = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getPrfSvcId()
	{
		return $this->prfSvcId;
	}
	
	public function setPrfSvcId($value)
	{
		$this->prfSvcId= $value;
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
		$json["prfSvcId"] = $this->getPrfSvcId();
		$json["lib"] = $this->getLib();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["prfSvcId"]))
		{
			$this->setPrfSvcId($json["prfSvcId"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
		if (isset($json["prfSvcId"]))
		{
			$this->prfSvc= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfSvc', $json["prfSvcId"]);
		}
	}
	
	public function getPrfSvc()
	{
		return $this->prfSvc;
	}
	public function getPrfUsers()
	{
		return $this->prfUsers;
	}
}
