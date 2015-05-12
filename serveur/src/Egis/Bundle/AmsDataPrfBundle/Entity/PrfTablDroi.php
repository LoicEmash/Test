<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_tabl_droi")
*/
class PrfTablDroi
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_tabl_droi_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="prf_tabl__id", nullable=false)
	*/
	protected $prfTablId;
	
	/**
	* @ORM\Column(type="integer", name="prf_prof__id", nullable=false)
	*/
	protected $prfProfId;
	
	/**
	* @ORM\Column(type="boolean", name="show", nullable=false)
	*/
	protected $show;
	
	/**
	* @ORM\Column(type="boolean", name="import", nullable=false)
	*/
	protected $import;
	
	/**
	* @ORM\Column(type="boolean", name="write", nullable=false)
	*/
	protected $write;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfProf")
	*  @ORM\JoinColumn(name="prf_prof__id", referencedColumnName="id")
	**/
	protected $prfProf;
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfTabl")
	*  @ORM\JoinColumn(name="prf_tabl__id", referencedColumnName="id")
	**/
	protected $prfTabl;
	
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
	
	public function getPrfTablId()
	{
		return $this->prfTablId;
	}
	
	public function setPrfTablId($value)
	{
		$this->prfTablId= $value;
	}
	
	public function getPrfProfId()
	{
		return $this->prfProfId;
	}
	
	public function setPrfProfId($value)
	{
		$this->prfProfId= $value;
	}
	
	public function getShow()
	{
		return $this->show;
	}
	
	public function setShow($value)
	{
		$this->show= $value;
	}
	
	public function getImport()
	{
		return $this->import;
	}
	
	public function setImport($value)
	{
		$this->import= $value;
	}
	
	public function getWrite()
	{
		return $this->write;
	}
	
	public function setWrite($value)
	{
		$this->write= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["prfTablId"] = $this->getPrfTablId();
		$json["prfProfId"] = $this->getPrfProfId();
		$json["show"] = $this->getShow();
		$json["import"] = $this->getImport();
		$json["write"] = $this->getWrite();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["prfTablId"]))
		{
			$this->setPrfTablId($json["prfTablId"]);
		}
		if (isset($json["prfProfId"]))
		{
			$this->setPrfProfId($json["prfProfId"]);
		}
		if (isset($json["show"]))
		{
			$this->setShow($json["show"]);
		}
		if (isset($json["import"]))
		{
			$this->setImport($json["import"]);
		}
		if (isset($json["write"]))
		{
			$this->setWrite($json["write"]);
		}
		if (isset($json["prfProfId"]))
		{
			$this->prfProf= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfProf', $json["prfProfId"]);
		}
		if (isset($json["prfTablId"]))
		{
			$this->prfTabl= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfTabl', $json["prfTablId"]);
		}
	}
	
	public function getPrfProf()
	{
		return $this->prfProf;
	}
	public function getPrfTabl()
	{
		return $this->prfTabl;
	}
}
