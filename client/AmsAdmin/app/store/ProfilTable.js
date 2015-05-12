// @charset UTF8
/*
 * Store des droits des profils sur les tables
 */
Ext.define('AmsAdmin.store.ProfilTable', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfTablDroi'         
     ],
     model: 'AmsDomainPrf.model.PrfTablDroi',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfTablDroi',
         useLimit:false,
         batchActions:true,
         batchOrder:'destroy,create,update'
     }),
     fields:['id', 'prfTablId', 'prfProfId','show','import','write']
 });