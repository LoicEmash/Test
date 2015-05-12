Ext.define('AmsDomainPrf.model.PrfFct', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfSch'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfFct',schema:'Prf'}),
	tableDisplayName : 'Fonction par schéma',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfSchId',validators : [{ type: 'presence' }],displayName:'Schema', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfSch'},
	{name: 'cod',validators : [{ type: 'length', max: 80 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Code fonction', type: 'string', uiType: 'string', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 150 }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: true}
]
});
