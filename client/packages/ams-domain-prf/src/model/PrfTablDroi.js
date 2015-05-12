Ext.define('AmsDomainPrf.model.PrfTablDroi', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfTabl','AmsDomainPrf.model.PrfProf'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfTablDroi',schema:'Prf'}),
	tableDisplayName : 'Droits sur les tables',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfTablId',validators : [{ type: 'presence' }],displayName:'Table', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfTabl'},
	{name: 'prfProfId',validators : [{ type: 'presence' }],displayName:'Profil', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfProf'},
	{name: 'show',validators : [{ type: 'presence' }],displayName:'Afficher', type: 'boolean', uiType: 'check', allowNull: false},
	{name: 'import',validators : [{ type: 'presence' }],displayName:'Import', type: 'boolean', uiType: 'check', allowNull: false},
	{name: 'write',validators : [{ type: 'presence' }],displayName:'Ecrire', type: 'boolean', uiType: 'check', allowNull: false}
]
});
