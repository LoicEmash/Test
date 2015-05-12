Ext.define('AmsDomainInf.model.InfGeo', {
extend: 'AmsDomainInf.model.InfBase',
requires : ['AmsDomainInf.model.InfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainInf.model.InfChaussee'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'InfGeo',schema:'Inf'}),
	tableDisplayName : 'Filaire',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'infChausseeId',validators : [{ type: 'presence' }],displayName:'Id2', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfChaussee'},
	{name: 'deb',validators : [{ type: 'presence' }],displayName:'Debut', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'fin',validators : [{ type: 'presence' }],displayName:'Fin', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'x1',validators : [{ type: 'presence' }],displayName:'X1', type: 'number', uiType: 'number', allowNull: false},
	{name: 'y1',validators : [{ type: 'presence' }],displayName:'Y1', type: 'number', uiType: 'number', allowNull: false},
	{name: 'x2',validators : [{ type: 'presence' }],displayName:'X2', type: 'number', uiType: 'number', allowNull: false},
	{name: 'y2',validators : [{ type: 'presence' }],displayName:'Y2', type: 'number', uiType: 'number', allowNull: false},
	{name: 'lineIndex',validators : [{ type: 'presence' }],displayName:'Index de ligne', type: 'int', uiType: 'int', allowNull: false}
]
});
