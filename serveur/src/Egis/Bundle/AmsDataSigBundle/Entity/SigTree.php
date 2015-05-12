<?php

namespace Egis\Bundle\AmsDataSigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="sig.sig_tree")
*/
class SigTree
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="sig.sig_tree_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="sig_theme__id", nullable=false)
	*/
	protected $sigThemeId;
	
	/**
	* @ORM\Column(type="integer", name="parent__id", nullable=true)
	*/
	protected $parentId;
	
	/**
	* @ORM\Column(type="string", name="lib", nullable=false)
	*/
	protected $lib;
	
	/**
	* @ORM\Column(type="string", name="json_param", nullable=true)
	*/
	protected $jsonParam;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="SigTheme")
	*  @ORM\JoinColumn(name="sig_theme__id", referencedColumnName="id")
	**/
	protected $sigTheme;
	
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
	
	public function getSigThemeId()
	{
		return $this->sigThemeId;
	}
	
	public function setSigThemeId($value)
	{
		$this->sigThemeId= $value;
	}
	
	public function getParentId()
	{
		return $this->parentId;
	}
	
	public function setParentId($value)
	{
		$this->parentId= $value;
	}
	
	public function getLib()
	{
		return $this->lib;
	}
	
	public function setLib($value)
	{
		$this->lib= $value;
	}
	
	public function getJsonParam()
	{
		return $this->jsonParam;
	}
	
	public function setJsonParam($value)
	{
		$this->jsonParam= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["sigThemeId"] = $this->getSigThemeId();
		$json["parentId"] = $this->getParentId();
		$json["lib"] = $this->getLib();
		$json["jsonParam"] = $this->getJsonParam();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["sigThemeId"]))
		{
			$this->setSigThemeId($json["sigThemeId"]);
		}
		if (isset($json["parentId"]))
		{
			$this->setParentId($json["parentId"]);
		}
		if (isset($json["lib"]))
		{
			$this->setLib($json["lib"]);
		}
		if (isset($json["jsonParam"]))
		{
			$this->setJsonParam($json["jsonParam"]);
		}
		if (isset($json["sigThemeId"]))
		{
			$this->sigTheme= $em->find('\Egis\Bundle\AmsDataSigBundle\Entity\SigTheme', $json["sigThemeId"]);
		}
	}
	
	public function getSigTheme()
	{
		return $this->sigTheme;
	}
}
