// @charset UTF8
/*
 * Store des fonction des utilisateurs
 */
Ext.define('AmsAdmin.store.Fonction', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainPrf.model.PrfPtfo'         
     ],
     model: 'AmsDomainPrf.model.PrfPtfo',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Prf',
         table:'PrfPtfo',
         useLimit:false
     }),
     fields:['id', 'lib', 'prfSvcId']
 });