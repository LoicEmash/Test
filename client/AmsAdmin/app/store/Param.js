// @charset UTF8
/*
 * Store des paramètres
 */
Ext.define('AmsAdmin.store.Param', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfParam'         
     ],
     model: 'AmsDomainPrf.model.PrfParam',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfParam',
         useLimit:false
     }),
     fields:['id', 'sch', 'code','valeur']
 });