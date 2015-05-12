// @charset UTF8
/*
 * Store des schémas
 */
Ext.define('AmsMain.store.Theme', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainSig.model.SigTheme'         
     ],
     model: 'AmsDomainSig.model.SigTheme',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Sig',
         table:'SigTheme',
         useLimit:false
     }),
     fields:['id', 'lib', 'code']
 });