Ext.define('AmsDomainPrf.model.PrfSte', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfSte',schema:'Prf'}),
	tableDisplayName : 'Société',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 80 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: false}
]
});
