// @charset UTF8
/*
 * Store des utilisateurs
 */
Ext.define('AmsAdmin.store.User', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfUser'         
     ],
     model: 'AmsDomainPrf.model.PrfUser',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfUser',
         useLimit:false
     }),
     fields:['login', 'nom', 'prenom','infCdDec','infCdDec','prfPtfoId','id']
 });