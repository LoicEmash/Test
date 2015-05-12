Ext.define('AmsDomainPrf.model.PrfProf', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfSch'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfProf',schema:'Prf'}),
	tableDisplayName : 'Profil',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfSchId',validators : [{ type: 'presence' }],displayName:'Schema', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfSch'},
	{name: 'profil',validators : [{ type: 'length', max: 20 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Profil', type: 'string', uiType: 'string', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 60 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: false},
	{name: 'genre',validators : [{ type: 'presence' }],displayName:'Genre (0 -> consul, 1 -> admin, 2 -> custom)', type: 'int', uiType: 'int', allowNull: false}
]
});
