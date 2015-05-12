Ext.define('AmsDomainInf.model.InfCdTpc', {
extend: 'AmsDomainInf.model.InfBase',
requires : ['AmsDomainInf.model.InfBase','AmsData.data.proxy.SecureRestProxy'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'InfCdTpc',schema:'Inf'}),
	tableDisplayName : 'Type de tpc',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'code',validators : [{ type: 'length', max: 20 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Code', type: 'string', uiType: 'string', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 500 }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: true}
]
});
