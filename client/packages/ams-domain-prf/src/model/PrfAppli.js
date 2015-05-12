Ext.define('AmsDomainPrf.model.PrfAppli', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfAppli',schema:'Prf'}),
	tableDisplayName : 'Application',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 80 }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: true},
	{name: 'code',validators : [{ type: 'length', max: 255 }],displayName:'Code', type: 'string', uiType: 'string', allowNull: true},
	{name: 'cle',validators : [{ type: 'length', max: 40 }],displayName:'Cle secrete', type: 'string', uiType: 'string', allowNull: true}
]
});
