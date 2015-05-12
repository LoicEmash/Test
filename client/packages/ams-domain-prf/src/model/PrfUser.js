Ext.define('AmsDomainPrf.model.PrfUser', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfPtfo'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfUser',schema:'Prf'}),
	tableDisplayName : 'Utilisateur',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfPtfoId',validators : [{ type: 'presence' }],displayName:'Poste/fonction', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfPtfo'},
	{name: 'login',validators : [{ type: 'length', max: 50 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Login', type: 'string', uiType: 'string', allowNull: false},
	{name: 'pass',validators : [{ type: 'length', max: 50 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Password', type: 'string', uiType: 'string', allowNull: false},
	{name: 'nom',validators : [{ type: 'length', max: 50 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Nom', type: 'string', uiType: 'string', allowNull: false},
	{name: 'prenom',validators : [{ type: 'length', max: 50 }],displayName:'Prenom', type: 'string', uiType: 'string', allowNull: true},
	{name: 'infFamDec',validators : [{ type: 'length', max: 50 }],displayName:'Famille decoupage', type: 'string', uiType: 'string', allowNull: true},
	{name: 'infCdDec',validators : [{ type: 'length', max: 50 }],displayName:'Code decoupage', type: 'string', uiType: 'string', allowNull: true},
	{name: 'avatar',displayName:'Avatar', type: 'string', uiType: 'image', allowNull: true}
]
});
