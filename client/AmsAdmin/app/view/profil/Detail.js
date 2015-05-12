
Ext.define("AmsAdmin.view.profil.Detail", {
    extend: "Ext.panel.Panel",
    xtype: 'ams-profil-detail',
    requires: [
        'AmsAdmin.view.profil.DetailController',
        'AmsAdmin.view.profil.DetailModel',
        'AmsLocale.util.Locale'
        
    ],
    layout:'fit',
    controller: "profil-detail",
    viewModel: {
        type: "profil-detail"
    },
    config: {
        readOnly: true,
        canEditTableRight :false,
        canEditFonctionRight :false,
        canEditSchema : false,
        record: null
    },
    setRecord: function (profilRecord)
    {
        this.record = profilRecord;
        if (this.getController() !== undefined && this.getController() !== null)
        {
            var controller = this.getController();
            controller.setRecord(profilRecord);
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
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'combo',
                        fieldLabel: AmsLocale.util.Locale.txtSchema,
                        reference: 'comboSchema',
                        allowBlank: false,
                        margin: 4,
                        store: Ext.create('Ext.data.ChainedStore', {source: 'AmsAdmin.store.Schema'}),
                        queryMode: 'local',
                        editable: false,
                        displayField: 'lib',
                        valueField: 'id',
                        readOnly: this.getReadOnly() || !this.getCanEditSchema(),
                        bind: {
                            value: '{schemaId}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        allowBlank: false,
                        reference: 'txtCode',
                        minLength: 2,
                        fieldLabel:  AmsLocale.util.Locale.txtCode,
                        margin: 4,
                        readOnly: this.getReadOnly(),
                        bind: {
                            value: '{code}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'txtLibelle',
                        allowBlank: false,
                        minLength: 2,
                        fieldLabel:  AmsLocale.util.Locale.txtLibelle,
                        margin: 4,
                        readOnly: this.getReadOnly(),
                        bind: {
                            value: '{libelle}'
                        }
                    },
                    {
                        xtype: 'tabpanel',
                        hidden:!this.getCanEditTableRight() && !this.getCanEditFonctionRight() ,
                        flex: 1,
                        items: [
                            {
                                title: AmsLocale.util.Locale.txtTables,      
                                layout:'fit',
                                hidden:!this.getCanEditTableRight()  ,
                                items: [
                                    {
                                        xtype: 'grid',
                                        reference: 'gridTable',                                       
                                        minWidth:500,
                                        width:500,                                       
                                        minHeight:200,
                                        maxHeight:400,
                                        viewConfig: {
                                            markDirty: false
                                        },
                                        columns: [
                                            {text:  AmsLocale.util.Locale.txtCode, menuDisabled: true, dataIndex: 'tableName', flex: 1},
                                            {text:  AmsLocale.util.Locale.txtLibelle, menuDisabled: true, dataIndex: 'displayName', flex: 1},
                                            {text: AmsLocale.util.Locale.txtAfficher, menuDisabled: true, dataIndex: 'canShow', xtype: 'checkcolumn', width: 70, disabled: this.getReadOnly()},
                                            {text:  AmsLocale.util.Locale.txtEcrire, menuDisabled: true, dataIndex: 'canWrite', xtype: 'checkcolumn', width: 70, disabled: this.getReadOnly()},
                                            {text:  AmsLocale.util.Locale.txtImporter, menuDisabled: true, dataIndex: 'canImport', xtype: 'checkcolumn', width: 70, disabled: this.getReadOnly()}
                                        ]

                                    }
                                ]

                            },
                            {
                                title: AmsLocale.util.Locale.txtFonctionalites,
                                layout:'fit',
                                hidden: !this.getCanEditFonctionRight(),
                                items: [
                                    {
                                        xtype: 'grid',
                                        reference: 'gridFeature',                                       
                                        minWidth:500,
                                        width:500,                                       
                                        minHeight:200,
                                        maxHeight:400,
                                        viewConfig: {
                                            markDirty: false
                                        },
                                        columns: [
                                            
                                            {text: AmsLocale.util.Locale.txtLibelle, dataIndex: 'featureName', flex: 1},                                          
                                            {text: AmsLocale.util.Locale.txtExecuter, dataIndex: 'canExec', xtype: 'checkcolumn', width: 70, disabled: this.getReadOnly()}                               
                                        ],
                                        bind: {
                                            store: '{profilFeatureStore}'
                                        }

                                    }
                                ]
                                
                            }
                        ]
                    }


                ],
                buttons: buttons
            }
        ];
        this.callParent(arguments);
    }
});
