// @charset UTF8
/*
 * Store des schémas
 */
Ext.define('AmsAdmin.store.Schema', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfSch'         
     ],
     model: 'AmsDomainPrf.model.PrfSch',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfSch',
         useLimit:false
     }),
     fields:['id', 'lib', 'schema']
 });