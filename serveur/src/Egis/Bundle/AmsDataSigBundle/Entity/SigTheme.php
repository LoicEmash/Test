<?php

namespace Egis\Bundle\AmsDataSigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="sig.sig_theme")
*/
class SigTheme
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="sig.sig_theme_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="string", name="code", nullable=false)
	*/
	protected $code;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=true)
	*/
	protected $lib;
	
	
	/**
	*  @ORM\OneToMany(targetEntity="SigTree", mappedBy="sigTheme")
	**/
	protected $sigTrees;
	
	public function __construct() {
	$this->sigTrees = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
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
		if (isset($json["code"]))
		{
			$this->setCode($json["code"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
	}
	
	public function getSigTrees()
	{
		return $this->sigTrees;
	}
}
