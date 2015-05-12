Ext.define('AmsDomainPrf.model.PrfFctDroi', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfProf','AmsDomainPrf.model.PrfFct'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfFctDroi',schema:'Prf'}),
	tableDisplayName : 'Droits sur les fonctions',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfProfId',validators : [{ type: 'presence' }],displayName:'Profil', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfProf'},
	{name: 'prfFctId',validators : [{ type: 'presence' }],displayName:'Fonction', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfFct'},
	{name: 'exec',validators : [{ type: 'presence' }],displayName:'Executer', type: 'boolean', uiType: 'check', allowNull: false}
]
});
