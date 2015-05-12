Ext.define('AmsMain.view.navigation.theme.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.navigation-theme-detail',
    requires:[
        'AmsUi.util.EditRecordPanelModel'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanelModel'
    },
    data: {      
        code: '',
        libelle:''
    },
    setRecord: function (record)
    {
        this.set('libelle', record.get('lib'));
        this.set('code', record.get('code'));
    },
    fillRecord: function (record)
    {
        record.set('lib', this.get('libelle'));
        record.set('code', this.get('code'));       
    }

});
