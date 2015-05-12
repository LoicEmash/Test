Ext.define('AmsAdmin.view.fonction.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.fonction-detail',
    data: {
        serviceId: null,
        societeId: null,
        libelle: ''
    },
    setRecord: function (fonctionRecord)
    {
        this.set('libelle', fonctionRecord.get('lib'));
        var idService = fonctionRecord.get('prfSvcId');
        this.set('serviceId', idService);
        var serviceStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Service');
        var serviceRec = serviceStore.findRecord('id', idService);
        var idSociete = null;
        if (serviceRec !== null)
        { idSociete = serviceRec.get('prfSteId'); }        
        this.set('societeId', idSociete);


    },
    fillRecord: function (record)
    {
        record.set('lib', this.get('libelle'));
        record.set('prfSvcId', this.get('serviceId'));       
    }

});
