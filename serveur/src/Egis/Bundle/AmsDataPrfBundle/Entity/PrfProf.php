<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_prof")
*/
class PrfProf
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_prof_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="prf_sch__id", nullable=false)
	*/
	protected $prfSchId;
	
	/**
	* @ORM\Column(type="string", name="profil", nullable=false)
	*/
	protected $profil;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=false)
	*/
	protected $lib;
	
	/**
	* @ORM\Column(type="integer", name="genre", nullable=false)
	*/
	protected $genre;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfSch")
	*  @ORM\JoinColumn(name="prf_sch__id", referencedColumnName="id")
	**/
	protected $prfSch;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfFctDroi", mappedBy="prfProf")
	**/
	protected $prfFctDrois;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfProfUser", mappedBy="prfProf")
	**/
	protected $prfProfUsers;
	
	/**
	*  @ORM\OneToMany(targetEntity="PrfTablDroi", mappedBy="prfProf")
	**/
	protected $prfTablDrois;
	
	public function __construct() {
	$this->prfFctDrois = new \Doctrine\Common\Collections\ArrayCollection();
	$this->prfProfUsers = new \Doctrine\Common\Collections\ArrayCollection();
	$this->prfTablDrois = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getPrfSchId()
	{
		return $this->prfSchId;
	}
	
	public function setPrfSchId($value)
	{
		$this->prfSchId= $value;
	}
	
	public function getProfil()
	{
		return $this->profil;
	}
	
	public function setProfil($value)
	{
		$this->profil= $value;
	}
	
	public function getLib()
	{
		return $this->lib;
	}
	
	public function setLib($value)
	{
		$this->lib= $value;
	}
	
	public function getGenre()
	{
		return $this->genre;
	}
	
	public function setGenre($value)
	{
		$this->genre= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["prfSchId"] = $this->getPrfSchId();
		$json["profil"] = $this->getProfil();
		$json["lib"] = $this->getLib();
		$json["genre"] = $this->getGenre();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["prfSchId"]))
		{
			$this->setPrfSchId($json["prfSchId"]);
		}
		if (isset($json["profil"]))
		{
			$this->setProfil($json["profil"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
		if (isset($json["genre"]))
		{
			$this->setGenre($json["genre"]);
		}
		if (isset($json["prfSchId"]))
		{
			$this->prfSch= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfSch', $json["prfSchId"]);
		}
	}
	
	public function getPrfSch()
	{
		return $this->prfSch;
	}
	public function getPrfFctDrois()
	{
		return $this->prfFctDrois;
	}
	public function getPrfProfUsers()
	{
		return $this->prfProfUsers;
	}
	public function getPrfTablDrois()
	{
		return $this->prfTablDrois;
	}
}
