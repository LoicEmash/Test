// @charset UTF8
/*
 * Store des services des sociétées
 */
Ext.define('AmsAdmin.store.Service', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfSvc'         
     ],
     model: 'AmsDomainPrf.model.PrfSvc',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfSvc',
         useLimit:false
     }),
     fields:['id', 'lib', 'prfSteId']
 });