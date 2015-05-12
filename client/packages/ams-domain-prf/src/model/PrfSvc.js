Ext.define('AmsDomainPrf.model.PrfSvc', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfSte'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfSvc',schema:'Prf'}),
	tableDisplayName : 'Service administratif',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfSteId',validators : [{ type: 'presence' }],displayName:'Societe', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfSte'},
	{name: 'lib',validators : [{ type: 'length', max: 80 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: false}
]
});
