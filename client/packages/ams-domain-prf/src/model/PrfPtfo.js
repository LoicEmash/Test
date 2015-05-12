Ext.define('AmsDomainPrf.model.PrfPtfo', {
extend: 'AmsDomainPrf.model.PrfBase',
requires : ['AmsDomainPrf.model.PrfBase','AmsData.data.proxy.SecureRestProxy','AmsDomainPrf.model.PrfSvc'],
	proxy: Ext.create('AmsData.data.proxy.SecureRestProxy',{ table:'PrfPtfo',schema:'Prf'}),
	tableDisplayName : 'Poste_fonctions',
	fields : [
	{name: 'id',displayName:'Id', type: 'int', uiType: 'id', allowNull: false},
	{name: 'prfSvcId',validators : [{ type: 'presence' }],displayName:'Service', type: 'int', uiType: 'combo', allowNull: false, reference:  'PrfSvc'},
	{name: 'lib',validators : [{ type: 'length', max: 80 },{ type: 'length', min: 1 },{ type: 'presence' }],displayName:'Libelle', type: 'string', uiType: 'string', allowNull: false}
]
});
