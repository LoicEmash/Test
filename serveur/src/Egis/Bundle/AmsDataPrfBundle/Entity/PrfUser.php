<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_user")
*/
class PrfUser
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_user_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="prf_ptfo__id", nullable=false)
	*/
	protected $prfPtfoId;
	
	/**
	* @ORM\Column(type="string", name="login", nullable=false)
	*/
	protected $login;
	
	/**
	* @ORM\Column(type="string", name="pass", nullable=false)
	*/
	protected $pass;
	
	/**
	* @ORM\Column(type="string", name="nom", nullable=false)
	*/
	protected $nom;
	
	/**
	* @ORM\Column(type="string", name="prenom", nullable=true)
	*/
	protected $prenom;
	
	/**
	* @ORM\Column(type="string", name="inf_fam_dec", nullable=true)
	*/
	protected $infFamDec;
	
	/**
	* @ORM\Column(type="string", name="inf_cd_dec", nullable=true)
	*/
	protected $infCdDec;
	
	/**
	* @ORM\Column(type="text", name="avatar", nullable=true)
	*/
	protected $avatar;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfPtfo")
	*  @ORM\JoinColumn(name="prf_ptfo__id", referencedColumnName="id")
	**/
	protected $prfPtfo;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfProfUser", mappedBy="prfUser")
	**/
	protected $prfProfUsers;
	
	public function __construct() {
	$this->prfProfUsers = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getPrfPtfoId()
	{
		return $this->prfPtfoId;
	}
	
	public function setPrfPtfoId($value)
	{
		$this->prfPtfoId= $value;
	}
	
	public function getLogin()
	{
		return $this->login;
	}
	
	public function setLogin($value)
	{
		$this->login= $value;
	}
	
	public function getPass()
	{
		return $this->pass;
	}
	
	public function setPass($value)
	{
		$this->pass= $value;
	}
	
	public function getNom()
	{
		return $this->nom;
	}
	
	public function setNom($value)
	{
		$this->nom= $value;
	}
	
	public function getPrenom()
	{
		return $this->prenom;
	}
	
	public function setPrenom($value)
	{
		$this->prenom= $value;
	}
	
	public function getInfFamDec()
	{
		return $this->infFamDec;
	}
	
	public function setInfFamDec($value)
	{
		$this->infFamDec= $value;
	}
	
	public function getInfCdDec()
	{
		return $this->infCdDec;
	}
	
	public function setInfCdDec($value)
	{
		$this->infCdDec= $value;
	}
	
	public function getAvatar()
	{
		return $this->avatar;
	}
	
	public function setAvatar($value)
	{
		$this->avatar= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["prfPtfoId"] = $this->getPrfPtfoId();
		$json["login"] = $this->getLogin();
		$json["pass"] = $this->getPass();
		$json["nom"] = $this->getNom();
		$json["prenom"] = $this->getPrenom();
		$json["infFamDec"] = $this->getInfFamDec();
		$json["infCdDec"] = $this->getInfCdDec();
		$json["avatar"] = $this->getAvatar();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["prfPtfoId"]))
		{
			$this->setPrfPtfoId($json["prfPtfoId"]);
		}
		if (isset($json["login"]))
		{
			$this->setLogin($json["login"]);
		}
		if (isset($json["pass"]))
		{
			$this->setPass($json["pass"]);
		}
		if (isset($json["nom"]))
		{
			$this->setNom($json["nom"]);
		}
		if (isset($json["prenom"]))
		{
			$this->setPrenom($json["prenom"]);
		}
		if (isset($json["infFamDec"]))
		{
			$this->setInfFamDec($json["infFamDec"]);
		}
		if (isset($json["infCdDec"]))
		{
			$this->setInfCdDec($json["infCdDec"]);
		}
		if (isset($json["avatar"]))
		{
			$this->setAvatar($json["avatar"]);
		}
		if (isset($json["prfPtfoId"]))
		{
			$this->prfPtfo= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfPtfo', $json["prfPtfoId"]);
		}
	}
	
	public function getPrfPtfo()
	{
		return $this->prfPtfo;
	}
	public function getPrfProfUsers()
	{
		return $this->prfProfUsers;
	}
}
