// @charset UTF8
/*
 * Vue detail d'un fonction/poste d'un tuilisateur
 */
Ext.define("AmsAdmin.view.fonction.Detail",{
    extend: "Ext.panel.Panel",
    requires : [
        'AmsAdmin.view.fonction.DetailController',
        'AmsAdmin.view.fonction.DetailModel',
        'AmsLocale.util.Locale'
    ],
    controller: "fonction-detail",
    viewModel: {
        type: "fonction-detail"
    },
    
    config: {
        readOnly: true,
        record: null
        
    },
    xtype: 'ams-fonction-detail',
    layout:'fit',
    setRecord: function (fonctionRecord)
    {
        this.record = fonctionRecord;
        if (this.getController() !== undefined && this.getController() !== null)
        {
            var controller = this.getController();
            controller.setRecord(fonctionRecord);
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
                        listeners: {
                            change: 'onComboSocieteChange'
                        },
                        bind: {
                            value: '{societeId}'
                        }
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: AmsLocale.util.Locale.txtService,
                        reference: 'comboService',
                        allowBlank: false,
                        editable: false,
                        margin: 4,
                        store: Ext.create('Ext.data.ChainedStore', {source: 'AmsAdmin.store.Service'}),
                        queryMode: 'local',
                        displayField: 'lib',
                        valueField: 'id',
                        readOnly: this.getReadOnly(),                        
                        bind: {
                            value: '{serviceId}'
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
