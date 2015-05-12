// @charset UTF8
/*
 * Store des fonctionalitées des applications
 */
Ext.define('AmsAdmin.store.Feature', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfFct'         
     ],
     model: 'AmsDomainPrf.model.PrfFct',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfFct',
         useLimit:false
     }),
     fields:['id', 'lib','code','prfSchId']
 });