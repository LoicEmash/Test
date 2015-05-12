<?php

namespace Egis\Bundle\AmsDataInfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="inf.inf_cd_dec")
*/
class InfCdDec
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="inf.inf_cd_dec_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="inf_fam_dec__id", nullable=false)
	*/
	protected $infFamDecId;
	
	/**
	* @ORM\Column(type="string", name="code", nullable=false)
	*/
	protected $code;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=true)
	*/
	protected $lib;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="InfFamDec")
	*  @ORM\JoinColumn(name="inf_fam_dec__id", referencedColumnName="id")
	**/
	protected $infFamDec;
	
	/**
	*  @ORM\OneToMany(targetEntity="InfTrDec", mappedBy="infCdDec")
	**/
	protected $infTrDecs;
	
	public function __construct() {
	$this->infTrDecs = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getInfFamDecId()
	{
		return $this->infFamDecId;
	}
	
	public function setInfFamDecId($value)
	{
		$this->infFamDecId= $value;
	}
	
	public function getCode()
	{
		return $this->code;
	}
	
	public function setCode($value)
	{
		$this->code= $value;
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
		$json["infFamDecId"] = $this->getInfFamDecId();
		$json["code"] = $this->getCode();
		$json["lib"] = $this->getLib();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["infFamDecId"]))
		{
			$this->setInfFamDecId($json["infFamDecId"]);
		}
		if (isset($json["code"]))
		{
			$this->setCode($json["code"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
		if (isset($json["infFamDecId"]))
		{
			$this->infFamDec= $em->find('\Egis\Bundle\AmsDataInfBundle\Entity\InfFamDec', $json["infFamDecId"]);
		}
	}
	
	public function getInfFamDec()
	{
		return $this->infFamDec;
	}
	public function getInfTrDecs()
	{
		return $this->infTrDecs;
	}
}
