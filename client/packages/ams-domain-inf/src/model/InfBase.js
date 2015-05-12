Ext.define('AmsDomainInf.model.InfBase', {
requires : ['Ext.data.Model'],
extend: 'Ext.data.Model',
schema : {displayName:'Infra',namespace : 'AmsDomainInf.model',id:'Inf',models:['AmsDomainInf.model.InfAire','AmsDomainInf.model.InfCdAire','AmsDomainInf.model.InfCdDec','AmsDomainInf.model.InfCdTpc','AmsDomainInf.model.InfChaussee','AmsDomainInf.model.InfFamDec','AmsDomainInf.model.InfGeo','AmsDomainInf.model.InfLiaison','AmsDomainInf.model.InfSens','AmsDomainInf.model.InfTpc','AmsDomainInf.model.InfTrDec']}
});
