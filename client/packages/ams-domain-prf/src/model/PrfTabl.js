Ext.define('AmsDomainPrf.model.PrfTabl', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfSch'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfTabl',schema:'Prf'}),
	tableDisplayName : 'Table par schéma',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfSchId',validators : [{ type: 'presence' }],displayName:'Schema', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfSch'},
	{name: 'code',validators : [{ type: 'length', max: 30 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Code table', type: 'string', uiType: 'string', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 150 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: false}
]
});
