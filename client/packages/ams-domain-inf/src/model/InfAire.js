Ext.define('AmsDomainInf.model.InfAire', {
extend: 'AmsDomainInf.model.InfBase',
requires : ['AmsDomainInf.model.InfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainInf.model.InfCdAire','AmsDomainInf.model.InfChaussee'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'InfAire',schema:'Inf'}),
	tableDisplayName : 'Aire',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'infCdAireId',validators : [{ type: 'presence' }],displayName:'Id2', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfCdAire'},
	{name: 'infChausseeId',validators : [{ type: 'presence' }],displayName:'Id3', type: 'int', uiType: 'combo', allowNull: false, reference:  'InfChaussee'},
	{name: 'deb',validators : [{ type: 'presence' }],displayName:'Debut', type: 'string', uiType: 'pr', allowNull: false},
	{name: 'numExp',validators : [{ type: 'length', max: 100 }],displayName:'N° exploitation', type: 'string', uiType: 'string', allowNull: true},
	{name: 'nom',validators : [{ type: 'length', max: 200 }],displayName:'Nom', type: 'string', uiType: 'string', allowNull: true},
	{name: 'dateMs',displayName:'Date ms', type: 'date', uiType: 'date', allowNull: true, dateFormat:'d/m/Y H:i:s',displayDateFormat:'d/m/Y'},
	{name: 'dt',displayName:'Demi tour', type: 'boolean', uiType: 'check', allowNull: true},
	{name: 'bl',displayName:'Bilaterale', type: 'boolean', uiType: 'check', allowNull: true},
	{name: 'ps',displayName:'Passerelle', type: 'boolean', uiType: 'check', allowNull: true},
	{name: 'info',validators : [{ type: 'length', max: 1000 }],displayName:'Commentaire', type: 'string', uiType: 'string', allowNull: true},
	{name: 'geom',displayName:'Geometrie', type: 'string', uiType: 'geom', allowNull: true},
	{name: 'geoc',displayName:'Geocodage', type: 'string', uiType: 'geom', allowNull: true}
]
});
