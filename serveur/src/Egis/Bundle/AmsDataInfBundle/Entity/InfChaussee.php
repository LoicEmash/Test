<?php

namespace Egis\Bundle\AmsDataInfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="inf.inf_chaussee")
*/
class InfChaussee
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="inf.inf_chaussee_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="inf_liaison__id", nullable=false)
	*/
	protected $infLiaisonId;
	
	/**
	* @ORM\Column(type="integer", name="inf_sens__id", nullable=false)
	*/
	protected $infSensId;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=true)
	*/
	protected $lib;
	
	/**
	* @ORM\Column(type="string", name="ten", nullable=true)
	*/
	protected $ten;
	
	/**
	* @ORM\Column(type="string", name="abo", nullable=true)
	*/
	protected $abo;
	
	/**
	* @ORM\Column(type="integer", name="deb", nullable=false)
	*/
	protected $deb;
	
	/**
	* @ORM\Column(type="integer", name="fin", nullable=false)
	*/
	protected $fin;
	
	/**
	* @ORM\Column(type="string", name="geom", nullable=true)
	*/
	protected $geom;
	
	/**
	* @ORM\Column(type="string", name="geoc", nullable=true)
	*/
	protected $geoc;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="InfLiaison")
	*  @ORM\JoinColumn(name="inf_liaison__id", referencedColumnName="id")
	**/
	protected $infLiaison;
	
	/**
	*  @ORM\ManyToOne(targetEntity="InfSens")
	*  @ORM\JoinColumn(name="inf_sens__id", referencedColumnName="id")
	**/
	protected $infSens;
	
	/**
	*  @ORM\OneToMany(targetEntity="InfTpc", mappedBy="infChaussee")
	**/
	protected $infTpcs;
	
	/**
	*  @ORM\OneToMany(targetEntity="InfGeo", mappedBy="infChaussee")
	**/
	protected $infGeos;
	
	/**
	*  @ORM\OneToMany(targetEntity="InfAire", mappedBy="infChaussee")
	**/
	protected $infAires;
	
	/**
	*  @ORM\OneToMany(targetEntity="InfTrDec", mappedBy="infChaussee")
	**/
	protected $infTrDecs;
	
	public function __construct() {
	$this->infTpcs = new \Doctrine\Common\Collections\ArrayCollection();
	$this->infGeos = new \Doctrine\Common\Collections\ArrayCollection();
	$this->infAires = new \Doctrine\Common\Collections\ArrayCollection();
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
	
	public function getInfLiaisonId()
	{
		return $this->infLiaisonId;
	}
	
	public function setInfLiaisonId($value)
	{
		$this->infLiaisonId= $value;
	}
	
	public function getInfSensId()
	{
		return $this->infSensId;
	}
	
	public function setInfSensId($value)
	{
		$this->infSensId= $value;
	}
	
	public function getLib()
	{
		return $this->lib;
	}
	
	public function setLib($value)
	{
		$this->lib= $value;
	}
	
	public function getTen()
	{
		return $this->ten;
	}
	
	public function setTen($value)
	{
		$this->ten= $value;
	}
	
	public function getAbo()
	{
		return $this->abo;
	}
	
	public function setAbo($value)
	{
		$this->abo= $value;
	}
	
	public function getDeb()
	{
		return $this->deb;
	}
	
	public function setDeb($value)
	{
		$this->deb= $value;
	}
	
	public function getFin()
	{
		return $this->fin;
	}
	
	public function setFin($value)
	{
		$this->fin= $value;
	}
	
	public function getGeom()
	{
		return $this->geom;
	}
	
	public function setGeom($value)
	{
		$this->geom= $value;
	}
	
	public function getGeoc()
	{
		return $this->geoc;
	}
	
	public function setGeoc($value)
	{
		$this->geoc= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["infLiaisonId"] = $this->getInfLiaisonId();
		$json["infSensId"] = $this->getInfSensId();
		$json["lib"] = $this->getLib();
		$json["ten"] = $this->getTen();
		$json["abo"] = $this->getAbo();
		$json["deb"] = $this->getDeb();
		$json["fin"] = $this->getFin();
		$json["geom"] = $this->getGeom();
		$json["geoc"] = $this->getGeoc();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["infLiaisonId"]))
		{
			$this->setInfLiaisonId($json["infLiaisonId"]);
		}
		if (isset($json["infSensId"]))
		{
			$this->setInfSensId($json["infSensId"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
		if (isset($json["ten"]))
		{
			$this->setTen($json["ten"]);
		}
		if (isset($json["abo"]))
		{
			$this->setAbo($json["abo"]);
		}
		if (isset($json["deb"]))
		{
			$this->setDeb($json["deb"]);
		}
		if (isset($json["fin"]))
		{
			$this->setFin($json["fin"]);
		}
		if (isset($json["geom"]))
		{
			$this->setGeom($json["geom"]);
		}
		if (isset($json["geoc"]))
		{
			$this->setGeoc($json["geoc"]);
		}
		if (isset($json["infLiaisonId"]))
		{
			$this->infLiaison= $em->find('\Egis\Bundle\AmsDataInfBundle\Entity\InfLiaison', $json["infLiaisonId"]);
		}
		if (isset($json["infSensId"]))
		{
			$this->infSens= $em->find('\Egis\Bundle\AmsDataInfBundle\Entity\InfSens', $json["infSensId"]);
		}
	}
	
	public function getInfLiaison()
	{
		return $this->infLiaison;
	}
	public function getInfSens()
	{
		return $this->infSens;
	}
	public function getInfTpcs()
	{
		return $this->infTpcs;
	}
	public function getInfGeos()
	{
		return $this->infGeos;
	}
	public function getInfAires()
	{
		return $this->infAires;
	}
	public function getInfTrDecs()
	{
		return $this->infTrDecs;
	}
}
