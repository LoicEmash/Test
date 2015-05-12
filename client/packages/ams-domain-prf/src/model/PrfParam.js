Ext.define('AmsDomainPrf.model.PrfParam', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfParam',schema:'Prf'}),
	tableDisplayName : 'Paramètres',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'sch',validators : [{ type: 'length', max: 10 }],displayName:'Schema', type: 'string', uiType: 'string', allowNull: true},
	{name: 'code',validators : [{ type: 'length', max: 50 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Code', type: 'string', uiType: 'string', allowNull: false},
	{name: 'valeur',validators : [{ type: 'length', max: 255 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Valeur', type: 'string', uiType: 'string', allowNull: false}
]
});
