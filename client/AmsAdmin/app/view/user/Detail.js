
Ext.define("AmsAdmin.view.user.Detail", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.user.DetailController',
        'AmsAdmin.view.user.DetailModel',
        'Ext.grid.plugin.CellEditing',
        'AmsLocale.util.Locale',
        'AmsUi.form.field.PictureBox'
    ],
    layout: 'fit',
    config: {
        readOnly: true,
        record: null,
        canEditPassword: false
    },
    xtype: 'ams-user-detail',
    controller: "user-detail",
    viewModel: {
        type: "user-detail"
    },
    setRecord: function (userRecord)
    {
        this.record = userRecord;
        if (this.getController() !== undefined && this.getController() !== null)
        {
            var controller = this.getController();
            controller.setRecord(userRecord);


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
                        xtype:'picturebox',
                        margin:4,
                        readOnly: this.getReadOnly(),
                        bind: {
                            value: '{photo}'
                        }
                        
                    },
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
                        fieldLabel:AmsLocale.util.Locale.txtService,
                        reference: 'comboService',
                        allowBlank: false,
                        editable: false,
                        margin: 4,
                        store: Ext.create('Ext.data.ChainedStore', {source: 'AmsAdmin.store.Service'}),
                        queryMode: 'local',
                        displayField: 'lib',
                        valueField: 'id',
                        readOnly: this.getReadOnly(),
                        listeners: {
                            change: 'onComboServiceChange'
                        },
                        bind: {
                            value: '{serviceId}'
                        }
                    },
                    {
                        xtype: 'combo',
                        reference: 'comboFonction',
                        fieldLabel: AmsLocale.util.Locale.txtFonction,
                        allowBlank: false,
                        editable: false,
                        store: Ext.create('Ext.data.ChainedStore', {source: 'AmsAdmin.store.Fonction'}),
                        queryMode: 'local',
                        displayField: 'lib',
                        valueField: 'id',
                        margin: 4,
                        readOnly: this.getReadOnly(),
                        bind: {
                            value: '{fonctionId}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        allowBlank: false,
                        minLength: 2,
                        fieldLabel: AmsLocale.util.Locale.txtNom,
                        margin: 4,
                        readOnly: this.getReadOnly(),
                        bind: {
                            value: '{nom}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        minLength: 2,
                        fieldLabel:AmsLocale.util.Locale.txtPrenom,
                        allowBlank: false,
                        margin: 4,
                        readOnly: this.getReadOnly(),
                        bind: {
                            value: '{prenom}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        allowBlank: false,
                        minLength: 2,
                        fieldLabel: AmsLocale.util.Locale.txtLogin,
                        margin: 4,
                        readOnly: this.getReadOnly(),
                        bind: {
                            value: '{login}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        allowBlank: !this.getCanEditPassword(),
                        minLength: 2,
                        inputType: 'password',
                        fieldLabel: AmsLocale.util.Locale.txtPassword,
                        margin: 4,
                        hidden: !this.getCanEditPassword(),
                        bind: {
                            value: '{password}'
                        }
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        minHeight:200,
                        maxHeight:500,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        scrollable  : true,
                        title: AmsLocale.util.Locale.txtProfils,
                        iconCls: 'icon-profil',
                        reference: 'gridUserProfil'

                    }

                ],
                buttons: buttons
            }
        ];
        this.callParent(arguments);
    }

});
