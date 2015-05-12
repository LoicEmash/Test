<?php

namespace Egis\Bundle\AmsDataInfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="inf.inf_tr_dec")
*/
class InfTrDec
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="inf.inf_tr_dec_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="inf_cd_dec__id", nullable=false)
	*/
	protected $infCdDecId;
	
	/**
	* @ORM\Column(type="integer", name="inf_chaussee__id", nullable=false)
	*/
	protected $infChausseeId;
	
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
	*  @ORM\ManyToOne(targetEntity="InfCdDec")
	*  @ORM\JoinColumn(name="inf_cd_dec__id", referencedColumnName="id")
	**/
	protected $infCdDec;
	
	/**
	*  @ORM\ManyToOne(targetEntity="InfChaussee")
	*  @ORM\JoinColumn(name="inf_chaussee__id", referencedColumnName="id")
	**/
	protected $infChaussee;
	
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
	
	public function getInfCdDecId()
	{
		return $this->infCdDecId;
	}
	
	public function setInfCdDecId($value)
	{
		$this->infCdDecId= $value;
	}
	
	public function getInfChausseeId()
	{
		return $this->infChausseeId;
	}
	
	public function setInfChausseeId($value)
	{
		$this->infChausseeId= $value;
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
		$json["infCdDecId"] = $this->getInfCdDecId();
		$json["infChausseeId"] = $this->getInfChausseeId();
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
		if (isset($json["infCdDecId"]))
		{
			$this->setInfCdDecId($json["infCdDecId"]);
		}
		if (isset($json["infChausseeId"]))
		{
			$this->setInfChausseeId($json["infChausseeId"]);
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
		if (isset($json["infCdDecId"]))
		{
			$this->infCdDec= $em->find('\Egis\Bundle\AmsDataInfBundle\Entity\InfCdDec', $json["infCdDecId"]);
		}
		if (isset($json["infChausseeId"]))
		{
			$this->infChaussee= $em->find('\Egis\Bundle\AmsDataInfBundle\Entity\InfChaussee', $json["infChausseeId"]);
		}
	}
	
	public function getInfCdDec()
	{
		return $this->infCdDec;
	}
	public function getInfChaussee()
	{
		return $this->infChaussee;
	}
}
