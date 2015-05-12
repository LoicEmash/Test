<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_usr_param")
*/
class PrfUsrParam
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_usr_param_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="string", name="login", nullable=false)
	*/
	protected $login;
	
	/**
	* @ORM\Column(type="string", name="sch", nullable=true)
	*/
	protected $sch;
	
	/**
	* @ORM\Column(type="string", name="code", nullable=false)
	*/
	protected $code;
	
	/**
	* @ORM\Column(type="string", name="val", nullable=false)
	*/
	protected $val;
	
	
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
	
	public function getLogin()
	{
		return $this->login;
	}
	
	public function setLogin($value)
	{
		$this->login= $value;
	}
	
	public function getSch()
	{
		return $this->sch;
	}
	
	public function setSch($value)
	{
		$this->sch= $value;
	}
	
	public function getCode()
	{
		return $this->code;
	}
	
	public function setCode($value)
	{
		$this->code= $value;
	}
	
	public function getVal()
	{
		return $this->val;
	}
	
	public function setVal($value)
	{
		$this->val= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["login"] = $this->getLogin();
		$json["sch"] = $this->getSch();
		$json["code"] = $this->getCode();
		$json["val"] = $this->getVal();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["login"]))
		{
			$this->setLogin($json["login"]);
		}
		if (isset($json["sch"]))
		{
			$this->setSch($json["sch"]);
		}
		if (isset($json["code"]))
		{
			$this->setCode($json["code"]);
		}
		if (isset($json["val"]))
		{
			$this->setVal($json["val"]);
		}
	}
	
}
