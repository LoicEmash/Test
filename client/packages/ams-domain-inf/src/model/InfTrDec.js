Ext.define('AmsDomainInf.model.InfTrDec', {
extend: 'AmsDomainInf.model.InfBase',
requires : ['AmsDomainInf.model.InfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainInf.model.InfCdDec','AmsDomainInf.model.InfChaussee'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'InfTrDec',schema:'Inf'}),
	tableDisplayName : 'Tronçons de découpage',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'infCdDecId',validators : [{ type: 'presence' }],displayName:'Code decoupage', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfCdDec'},
	{name: 'infChausseeId',validators : [{ type: 'presence' }],displayName:'Chaussee', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfChaussee'},
	{name: 'deb',validators : [{ type: 'presence' }],displayName:'Debut', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'fin',validators : [{ type: 'presence' }],displayName:'Fin', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'geom',displayName:'Geometrie', type: 'string', uiType: 'geom', allowNull: true},
	{name: 'geoc',displayName:'Geocodage', type: 'string', uiType: 'geom', allowNull: true}
]
});
