Ext.define('AmsDomainSig.model.SigTree', {
extend: 'AmsDomainSig.model.SigBase',
requires : ['AmsDomainSig.model.SigBase','AmsData.data.proxy.SecureRestProxy','AmsDomainSig.model.SigTheme'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'SigTree',schema:'Sig'}),
	tableDisplayName : 'Arbe de thème',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'sigThemeId',validators : [{ type: 'presence' }],displayName:'Id2', type: 'int', uiType: 'combo', allowNull: false, reference:  'SigTheme'},
	{name: 'parentId',displayName:'Parent id', type: 'int', uiType: 'combo', allowNull: true},
	{name: 'lib',validators : [{ type: 'length', max: 50 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: false},
	{name: 'jsonParam',displayName:'Parametre json', type: 'string', uiType: 'text', allowNull: true}
]
});
