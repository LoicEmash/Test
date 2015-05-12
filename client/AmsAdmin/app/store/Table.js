// @charset UTF8
/*
 * Store des tables des schémas
 */
Ext.define('AmsAdmin.store.Table', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfTabl'         
     ],
     model: 'AmsDomainPrf.model.PrfTabl',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfTabl',
         useLimit:false
     }),
     fields:['id', 'lib','code','prfSchId']
 });