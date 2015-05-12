// @charset UTF8
/*
 * Store des schémas
 */
Ext.define('AmsMain.store.Tree', {     
     extend: 'Ext.data.Store',
     requires:[
         'AmsDomainSig.model.SigTree'         
     ],
     model: 'AmsDomainSig.model.SigTree',
     proxy:Ext.create('AmsData.data.proxy.SecureRestProxy',{
         schema:'Sig',
         table:'SigTree',
         useLimit:false
     })
     
 });