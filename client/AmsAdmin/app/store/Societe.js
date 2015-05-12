// @charset UTF8
/*
 * Store des société
 */
Ext.define('AmsAdmin.store.Societe', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfSte'         
     ],
     model: 'AmsDomainPrf.model.PrfSte',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfSte',
         useLimit:false
     }),
     fields:['id', 'lib']
 });