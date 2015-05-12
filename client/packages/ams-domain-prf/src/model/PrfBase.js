Ext.define('AmsDomainPrf.model.PrfBase', {
requires : ['Ext.data.Model'],
extend: 'Ext.data.Model',
schema : {displayName:'Profil',namespace : 'AmsDomainPrf.model',id:'Prf',models:['AmsDomainPrf.model.PrfAppli','AmsDomainPrf.model.PrfFct','AmsDomainPrf.model.PrfFctDroi','AmsDomainPrf.model.PrfParam','AmsDomainPrf.model.PrfProf','AmsDomainPrf.model.PrfProfUser','AmsDomainPrf.model.PrfPtfo','AmsDomainPrf.model.PrfSch','AmsDomainPrf.model.PrfSte','AmsDomainPrf.model.PrfSvc','AmsDomainPrf.model.PrfTabl','AmsDomainPrf.model.PrfTablDroi','AmsDomainPrf.model.PrfUser','AmsDomainPrf.model.PrfUsrParam']}
});
