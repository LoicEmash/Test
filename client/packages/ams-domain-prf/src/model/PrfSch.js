Ext.define('AmsDomainPrf.model.PrfSch', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfSch',schema:'Prf'}),
	tableDisplayName : 'Schéma ams',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'schema',validators : [{ type: 'length', max: 5 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Schema', type: 'string', uiType: 'string', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 255 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: false}
]
});
