<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_fct_droi")
*/
class PrfFctDroi
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_fct_droi_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="prf_prof__id", nullable=false)
	*/
	protected $prfProfId;
	
	/**
	* @ORM\Column(type="integer", name="prf_fct__id", nullable=false)
	*/
	protected $prfFctId;
	
	/**
	* @ORM\Column(type="boolean", name="exec", nullable=false)
	*/
	protected $exec;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfFct")
	*  @ORM\JoinColumn(name="prf_fct__id", referencedColumnName="id")
	**/
	protected $prfFct;
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfProf")
	*  @ORM\JoinColumn(name="prf_prof__id", referencedColumnName="id")
	**/
	protected $prfProf;
	
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
	
	public function getPrfProfId()
	{
		return $this->prfProfId;
	}
	
	public function setPrfProfId($value)
	{
		$this->prfProfId= $value;
	}
	
	public function getPrfFctId()
	{
		return $this->prfFctId;
	}
	
	public function setPrfFctId($value)
	{
		$this->prfFctId= $value;
	}
	
	public function getExec()
	{
		return $this->exec;
	}
	
	public function setExec($value)
	{
		$this->exec= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["prfProfId"] = $this->getPrfProfId();
		$json["prfFctId"] = $this->getPrfFctId();
		$json["exec"] = $this->getExec();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["prfProfId"]))
		{
			$this->setPrfProfId($json["prfProfId"]);
		}
		if (isset($json["prfFctId"]))
		{
			$this->setPrfFctId($json["prfFctId"]);
		}
		if (isset($json["exec"]))
		{
			$this->setExec($json["exec"]);
		}
		if (isset($json["prfFctId"]))
		{
			$this->prfFct= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfFct', $json["prfFctId"]);
		}
		if (isset($json["prfProfId"]))
		{
			$this->prfProf= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfProf', $json["prfProfId"]);
		}
	}
	
	public function getPrfFct()
	{
		return $this->prfFct;
	}
	public function getPrfProf()
	{
		return $this->prfProf;
	}
}
