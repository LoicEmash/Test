<?php

namespace Egis\Bundle\AmsDataInfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="inf.inf_geo")
*/
class InfGeo
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="inf.inf_geo_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
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
	* @ORM\Column(type="float", name="x1", nullable=false)
	*/
	protected $x1;
	
	/**
	* @ORM\Column(type="float", name="y1", nullable=false)
	*/
	protected $y1;
	
	/**
	* @ORM\Column(type="float", name="x2", nullable=false)
	*/
	protected $x2;
	
	/**
	* @ORM\Column(type="float", name="y2", nullable=false)
	*/
	protected $y2;
	
	/**
	* @ORM\Column(type="integer", name="line_index", nullable=false)
	*/
	protected $lineIndex;
	
	
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
	
	public function getX1()
	{
		return $this->x1;
	}
	
	public function setX1($value)
	{
		$this->x1= $value;
	}
	
	public function getY1()
	{
		return $this->y1;
	}
	
	public function setY1($value)
	{
		$this->y1= $value;
	}
	
	public function getX2()
	{
		return $this->x2;
	}
	
	public function setX2($value)
	{
		$this->x2= $value;
	}
	
	public function getY2()
	{
		return $this->y2;
	}
	
	public function setY2($value)
	{
		$this->y2= $value;
	}
	
	public function getLineIndex()
	{
		return $this->lineIndex;
	}
	
	public function setLineIndex($value)
	{
		$this->lineIndex= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["infChausseeId"] = $this->getInfChausseeId();
		$json["deb"] = $this->getDeb();
		$json["fin"] = $this->getFin();
		$json["x1"] = $this->getX1();
		$json["y1"] = $this->getY1();
		$json["x2"] = $this->getX2();
		$json["y2"] = $this->getY2();
		$json["lineIndex"] = $this->getLineIndex();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
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
		if (isset($json["x1"]))
		{
			$this->setX1($json["x1"]);
		}
		if (isset($json["y1"]))
		{
			$this->setY1($json["y1"]);
		}
		if (isset($json["x2"]))
		{
			$this->setX2($json["x2"]);
		}
		if (isset($json["y2"]))
		{
			$this->setY2($json["y2"]);
		}
		if (isset($json["lineIndex"]))
		{
			$this->setLineIndex($json["lineIndex"]);
		}
		if (isset($json["infChausseeId"]))
		{
			$this->infChaussee= $em->find('\Egis\Bundle\AmsDataInfBundle\Entity\InfChaussee', $json["infChausseeId"]);
		}
	}
	
	public function getInfChaussee()
	{
		return $this->infChaussee;
	}
}
