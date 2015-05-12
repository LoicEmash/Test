Ext.define('AmsDomainInf.model.InfCdDec', {
extend: 'AmsDomainInf.model.InfBase',
requires : ['AmsDomainInf.model.InfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainInf.model.InfFamDec'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'InfCdDec',schema:'Inf'}),
	tableDisplayName : 'Code découpages',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'infFamDecId',validators : [{ type: 'presence' }],displayName:'Famille', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfFamDec'},
	{name: 'code',validators : [{ type: 'length', max: 200 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Code', type: 'string', uiType: 'string', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 500 }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: true}
]
});
