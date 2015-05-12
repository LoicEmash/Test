Ext.define('AmsAdmin.view.societe.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.societe-detail',
    data: {
        libelle: ''
       
    },
     setRecord: function (societeRecord)
    {
        this.set('libelle', societeRecord.get('lib'));      
   
    },
    fillRecord: function (serviceRecord)
    {
        serviceRecord.set('lib', this.get('libelle'));
       
    }

});
