// @charset UTF8
/*
 * Store des profils des utilisateurs
 */
Ext.define('AmsAdmin.store.UserProfil', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfProfUser'         
     ],
     model: 'AmsDomainPrf.model.PrfProfUser',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfProfUser',
         useLimit:false,
         batchActions:true,
         batchOrder:'destroy,create,update'
     }),
     fields:['id', 'prfProfId', 'prfUserId']
 });