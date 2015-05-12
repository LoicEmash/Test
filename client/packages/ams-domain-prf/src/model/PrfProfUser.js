Ext.define('AmsDomainPrf.model.PrfProfUser', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfProf','AmsDomainPrf.model.PrfUser'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfProfUser',schema:'Prf'}),
	tableDisplayName : 'Profils utilisateurs',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfProfId',validators : [{ type: 'presence' }],displayName:'Profil', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfProf'},
	{name: 'prfUserId',validators : [{ type: 'presence' }],displayName:'Utilisateur', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfUser'}
]
});
