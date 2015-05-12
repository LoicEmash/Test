<?php

namespace Egis\Bundle\AmsDataInfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="inf.inf_aire")
*/
class InfAire
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="inf.inf_aire_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="inf_cd_aire__id", nullable=false)
	*/
	protected $infCdAireId;
	
	/**
	* @ORM\Column(type="integer", name="inf_chaussee__id", nullable=false)
	*/
	protected $infChausseeId;
	
	/**
	* @ORM\Column(type="integer", name="deb", nullable=false)
	*/
	protected $deb;
	
	/**
	* @ORM\Column(type="string", name="num_exp", nullable=true)
	*/
	protected $numExp;
	
	/**
	* @ORM\Column(type="string", name="nom", nullable=true)
	*/
	protected $nom;
	
	/**
	* @ORM\Column(type="date", name="date_ms", nullable=true)
	*/
	protected $dateMs;
	
	/**
	* @ORM\Column(type="boolean", name="dt", nullable=true)
	*/
	protected $dt;
	
	/**
	* @ORM\Column(type="boolean", name="bl", nullable=true)
	*/
	protected $bl;
	
	/**
	* @ORM\Column(type="boolean", name="ps", nullable=true)
	*/
	protected $ps;
	
	/**
	* @ORM\Column(type="string", name="info", nullable=true)
	*/
	protected $info;
	
	/**
	* @ORM\Column(type="string", name="geom", nullable=true)
	*/
	protected $geom;
	
	/**
	* @ORM\Column(type="string", name="geoc", nullable=true)
	*/
	protected $geoc;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="InfCdAire")
	*  @ORM\JoinColumn(name="inf_cd_aire__id", referencedColumnName="id")
	**/
	protected $infCdAire;
	
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
	
	public function getInfCdAireId()
	{
		return $this->infCdAireId;
	}
	
	public function setInfCdAireId($value)
	{
		$this->infCdAireId= $value;
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
	
	public function getNumExp()
	{
		return $this->numExp;
	}
	
	public function setNumExp($value)
	{
		$this->numExp= $value;
	}
	
	public function getNom()
	{
		return $this->nom;
	}
	
	public function setNom($value)
	{
		$this->nom= $value;
	}
	
	public function getDateMs()
	{
		return $this->dateMs;
	}
	
	public function setDateMs($value)
	{
		$this->dateMs= $value;
	}
	
	public function getDt()
	{
		return $this->dt;
	}
	
	public function setDt($value)
	{
		$this->dt= $value;
	}
	
	public function getBl()
	{
		return $this->bl;
	}
	
	public function setBl($value)
	{
		$this->bl= $value;
	}
	
	public function getPs()
	{
		return $this->ps;
	}
	
	public function setPs($value)
	{
		$this->ps= $value;
	}
	
	public function getInfo()
	{
		return $this->info;
	}
	
	public function setInfo($value)
	{
		$this->info= $value;
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
		$json["infCdAireId"] = $this->getInfCdAireId();
		$json["infChausseeId"] = $this->getInfChausseeId();
		$json["deb"] = $this->getDeb();
		$json["numExp"] = $this->getNumExp();
		$json["nom"] = $this->getNom();
		if ($this->getDateMs() !== null && $this->getDateMs() !== '')
		{$json["dateMs"] = $this->getDateMs()->format('d/m/Y H:i:s');}
		else { $json["dateMs"] = null;}
		$json["dt"] = $this->getDt();
		$json["bl"] = $this->getBl();
		$json["ps"] = $this->getPs();
		$json["info"] = $this->getInfo();
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
		if (isset($json["infCdAireId"]))
		{
			$this->setInfCdAireId($json["infCdAireId"]);
		}
		if (isset($json["infChausseeId"]))
		{
			$this->setInfChausseeId($json["infChausseeId"]);
		}
		if (isset($json["deb"]))
		{
			$this->setDeb($json["deb"]);
		}
		if (isset($json["numExp"]))
		{
			$this->setNumExp($json["numExp"]);
		}
		if (isset($json["nom"]))
		{
			$this->setNom($json["nom"]);
		}
		if (isset($json["dateMs"]))
		{
			if ($json["dateMs"] !== null && $json["dateMs"] !== '')
			{$this->setDateMs(\DateTime::createFromFormat('d/m/Y H:i:s',$json["dateMs"]));}
			else {$this->setDateMs(null);}
		}
		if (isset($json["dt"]))
		{
			$this->setDt($json["dt"]);
		}
		if (isset($json["bl"]))
		{
			$this->setBl($json["bl"]);
		}
		if (isset($json["ps"]))
		{
			$this->setPs($json["ps"]);
		}
		if (isset($json["info"]))
		{
			$this->setInfo($json["info"]);
		}
		if (isset($json["geom"]))
		{
			$this->setGeom($json["geom"]);
		}
		if (isset($json["geoc"]))
		{
			$this->setGeoc($json["geoc"]);
		}
		if (isset($json["infCdAireId"]))
		{
			$this->infCdAire= $em->find('\Egis\Bundle\AmsDataInfBundle\Entity\InfCdAire', $json["infCdAireId"]);
		}
		if (isset($json["infChausseeId"]))
		{
			$this->infChaussee= $em->find('\Egis\Bundle\AmsDataInfBundle\Entity\InfChaussee', $json["infChausseeId"]);
		}
	}
	
	public function getInfCdAire()
	{
		return $this->infCdAire;
	}
	public function getInfChaussee()
	{
		return $this->infChaussee;
	}
}
