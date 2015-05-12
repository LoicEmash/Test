Ext.define('AmsDomainInf.model.InfChaussee', {
extend: 'AmsDomainInf.model.InfBase',
requires : ['AmsDomainInf.model.InfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainInf.model.InfLiaison','AmsDomainInf.model.InfSens'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'InfChaussee',schema:'Inf'}),
	tableDisplayName : 'Chaussée',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'infLiaisonId',validators : [{ type: 'presence' }],displayName:'Liaison', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfLiaison'},
	{name: 'infSensId',validators : [{ type: 'presence' }],displayName:'Sens', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfSens'},
	{name: 'lib',validators : [{ type: 'length', max: 500 }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: true},
	{name: 'ten',validators : [{ type: 'length', max: 500 }],displayName:'Tenant', type: 'string', uiType: 'string', allowNull: true},
	{name: 'abo',validators : [{ type: 'length', max: 500 }],displayName:'Aboutissant', type: 'string', uiType: 'string', allowNull: true},
	{name: 'deb',validators : [{ type: 'presence' }],displayName:'Debut', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'fin',validators : [{ type: 'presence' }],displayName:'Fin', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'geom',displayName:'Geometrie', type: 'string', uiType: 'geom', allowNull: true},
	{name: 'geoc',displayName:'Geocodage', type: 'string', uiType: 'geom', allowNull: true}
]
});
