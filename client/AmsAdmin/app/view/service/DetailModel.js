Ext.define('AmsAdmin.view.service.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.service-detail',
    data: {       
        societeId: null,
        libelle: ''
    },
    setRecord: function (serviceRecord)
    {
        this.set('libelle', serviceRecord.get('lib'));
        var idSociete = serviceRecord.get('prfSteId');
        this.set('societeId', idSociete);
    },
    fillRecord: function (serviceRecord)
    {
        serviceRecord.set('lib', this.get('libelle'));
        serviceRecord.set('prfSteId', this.get('societeId'));       
    }
});
