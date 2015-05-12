Ext.define('AmsDomainPrf.model.PrfUsrParam', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfUsrParam',schema:'Prf'}),
	tableDisplayName : 'Paramètres utilisateur',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'login',validators : [{ type: 'length', max: 200 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Login', type: 'string', uiType: 'string', allowNull: false},
	{name: 'sch',validators : [{ type: 'length', max: 10 }],displayName:'Schema', type: 'string', uiType: 'string', allowNull: true},
	{name: 'code',validators : [{ type: 'length', max: 200 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Code', type: 'string', uiType: 'string', allowNull: false},
	{name: 'val',validators : [{ type: 'length', max: 500 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Valeur', type: 'string', uiType: 'string', allowNull: false}
]
});
