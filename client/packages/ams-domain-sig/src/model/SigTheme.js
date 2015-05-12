Ext.define('AmsDomainSig.model.SigTheme', {
extend: 'AmsDomainSig.model.SigBase',
requires : ['AmsDomainSig.model.SigBase','AmsData.data.proxy.SecureRestProxy'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'SigTheme',schema:'Sig'}),
	tableDisplayName : 'Thèmes',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'code',validators : [{ type: 'length', max: 255 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Code', type: 'string', uiType: 'string', allowNull: false},
	{name: 'lib',validators : [{ type: 'length', max: 500 }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: true}
]
});
