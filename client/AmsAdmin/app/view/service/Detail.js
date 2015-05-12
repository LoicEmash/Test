Ext.define("AmsAdmin.view.service.Detail", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.service.DetailController',
        'AmsAdmin.view.service.DetailModel',
        'AmsLocale.util.Locale'
    ],
    controller: "service-detail",
    viewModel: {
        type: "service-detail"
    },
    layout:'fit',
    config: {
        readOnly: true,
        record: null
    },
    xtype: 'ams-service-detail',
    setRecord: function (serviceRecord)
    {
        this.record = serviceRecord;
        if (this.getController() !== undefined && this.getController() !== null)
        {
            var controller = this.getController();
            controller.setRecord(serviceRecord);
        }

    },
    initComponent: function () {
        var buttons = [];
        if (this.getReadOnly() === false)
        {
            buttons = [{
                    text: AmsLocale.util.Locale.txtCancel,
                    hidden: this.getReadOnly(),
                    scale:'medium',
                    iconCls:'icon-cancel-medium',
                    handler: 'onCancelClick'
                }, {
                    text: AmsLocale.util.Locale.txtOk,
                    hidden: this.getReadOnly(),
                    scale:'medium',
                    iconCls:'icon-ok-medium',
                    formBind: true,
                    disabled: true,
                    handler: 'onOkClick'
                }];
        }
        this.items = [
            {
                xtype: 'form',
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                items: [
                    {
                        xtype: 'combo',
                        fieldLabel: AmsLocale.util.Locale.txtSociete,
                        reference: 'comboSociete',
                        allowBlank: false,
                        margin: 4,
                        store: Ext.create('Ext.data.ChainedStore', {source: 'AmsAdmin.store.Societe'}),
                        queryMode: 'local',
                        editable: false,
                        displayField: 'lib',
                        valueField: 'id',
                        readOnly: this.getReadOnly(),                        
                        bind: {
                            value: '{societeId}'
                        }
                    },                                 
                    {
                        xtype: 'textfield',
                        allowBlank: false,
                        minLength: 2,
                        fieldLabel: AmsLocale.util.Locale.txtLibelle,
                        margin: 4,
                        readOnly: this.getReadOnly(),
                        bind: {
                            value: '{libelle}'
                        }
                    }
                    

                ],
                buttons: buttons
            }
        ];
        this.callParent(arguments);
    }
});
