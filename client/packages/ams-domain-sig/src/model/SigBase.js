Ext.define('AmsDomainSig.model.SigBase', {
requires : ['Ext.data.Model'],
extend: 'Ext.data.Model',
schema : {displayName:'Sig',namespace : 'AmsDomainSig.model',id:'Sig',models:['AmsDomainSig.model.SigTheme','AmsDomainSig.model.SigTree']}
});
