// @charset UTF8
/*
 * Store des profils
 */
Ext.define('AmsAdmin.store.Profil', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfProf'         
     ],
     model: 'AmsDomainPrf.model.PrfProf',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfProf',
         useLimit:false
     }),
     fields:['id', 'lib', 'profil','prfSchId','genre']
 });