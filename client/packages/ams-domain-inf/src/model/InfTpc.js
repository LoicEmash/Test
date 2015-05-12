Ext.define('AmsDomainInf.model.InfTpc', {
extend: 'AmsDomainInf.model.InfBase',
requires : ['AmsDomainInf.model.InfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainInf.model.InfChaussee','AmsDomainInf.model.InfCdTpc'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'InfTpc',schema:'Inf'}),
	tableDisplayName : 'Tpc',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'infChausseeId',validators : [{ type: 'presence' }],displayName:'Chaussee', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfChaussee'},
	{name: 'infCdTpcId',validators : [{ type: 'presence' }],displayName:'Code tpc', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfCdTpc'},
	{name: 'deb',validators : [{ type: 'presence' }],displayName:'Debut', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'fin',validators : [{ type: 'presence' }],displayName:'Fin', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'geom',displayName:'Geometrie', type: 'string', uiType: 'geom', allowNull: true},
	{name: 'geoc',displayName:'Geocodage', type: 'string', uiType: 'geom', allowNull: true}
]
});
