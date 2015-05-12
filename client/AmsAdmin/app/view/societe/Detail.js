Ext.define("AmsAdmin.view.societe.Detail", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.societe.DetailController',
        'AmsAdmin.view.societe.DetailModel',
        'AmsLocale.util.Locale'
    ],
    controller: "societe-detail",
    viewModel: {
        type: "societe-detail"
    },
    layout:'fit',
    config: {
        readOnly: true,
        record: null
    },
    xtype: 'ams-societe-detail',
    setRecord: function (societeRecord)
    {
        this.record = societeRecord;
        if (this.getController() !== undefined && this.getController() !== null)
        {
            var controller = this.getController();
            controller.setRecord(societeRecord);
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
