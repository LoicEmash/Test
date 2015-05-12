// @charset UTF8
/*
 * Store des droit des profils sur les fonctionalitées
 */
Ext.define('AmsAdmin.store.ProfilFeature', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfFctDroi'         
     ],
     model: 'AmsDomainPrf.model.PrfFctDroi',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfFctDroi',
         useLimit:false,
         batchActions:true,
         batchOrder:'destroy,create,update'
     }),
     fields:['id', 'prfProfId', 'prfFctId','exec']
 });