<?php

namespace Egis\Bundle\AmsDataPrfBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="prf.prf_prof_user")
*/
class PrfProfUser
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="prf.prf_prof_user_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="prf_prof__id", nullable=false)
	*/
	protected $prfProfId;
	
	/**
	* @ORM\Column(type="integer", name="prf_user__id", nullable=false)
	*/
	protected $prfUserId;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfProf")
	*  @ORM\JoinColumn(name="prf_prof__id", referencedColumnName="id")
	**/
	protected $prfProf;
	
	/**
	*  @ORM\ManyToOne(targetEntity="PrfUser")
	*  @ORM\JoinColumn(name="prf_user__id", referencedColumnName="id")
	**/
	protected $prfUser;
	
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
	
	public function getPrfProfId()
	{
		return $this->prfProfId;
	}
	
	public function setPrfProfId($value)
	{
		$this->prfProfId= $value;
	}
	
	public function getPrfUserId()
	{
		return $this->prfUserId;
	}
	
	public function setPrfUserId($value)
	{
		$this->prfUserId= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["prfProfId"] = $this->getPrfProfId();
		$json["prfUserId"] = $this->getPrfUserId();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["prfProfId"]))
		{
			$this->setPrfProfId($json["prfProfId"]);
		}
		if (isset($json["prfUserId"]))
		{
			$this->setPrfUserId($json["prfUserId"]);
		}
		if (isset($json["prfProfId"]))
		{
			$this->prfProf= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfProf', $json["prfProfId"]);
		}
		if (isset($json["prfUserId"]))
		{
			$this->prfUser= $em->find('\Egis\Bundle\AmsDataPrfBundle\Entity\PrfUser', $json["prfUserId"]);
		}
	}
	
	public function getPrfProf()
	{
		return $this->prfProf;
	}
	public function getPrfUser()
	{
		return $this->prfUser;
	}
}
