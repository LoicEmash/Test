
Ext.define("AmsMain.view.navigation.tree.node.metier.layer.Detail",{
    extend: "Ext.panel.Panel",
    xtype: 'ams-navigation-tree-node-metier-layer-detail',
    controller: "navigation-tree-node-metier-layer-detail",
    viewModel: {
        type: "navigation-tree-node-metier-layer-detail"
    },
    requires: [
        'AmsMain.view.navigation.tree.node.metier.layer.DetailController',
        'AmsMain.view.navigation.tree.node.metier.layer.DetailModel',
        'AmsUi.util.EditRecordPanel',
        'AmsData.util.Model'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanel'
		
    },
    initComponent: function () {
        var buttons = [];
        var schemas = AmsData.util.Model.getSchemas();
        var schemaInfos = [];
        for (var i = 0; i < schemas.length; i++)
        {
            schemaInfos.push({
                code: schemas[i].id,
                libelle: schemas[i].displayName
            });
        }
        console.log(schemaInfos);
        if (this.getReadOnly() === false)
        {
            buttons = [{
                    text: AmsLocale.util.Locale.txtCancel,
                    hidden: this.getReadOnly(),
                    scale: 'medium',
                    iconCls: 'icon-cancel-medium',
                    handler: 'onCancelClick'
                }, {
                    text: AmsLocale.util.Locale.txtOk,
                    hidden: this.getReadOnly(),
                    scale: 'medium',
                    iconCls: 'icon-ok-medium',
                    formBind: true,
                    disabled: true,
                    handler: 'onOkClick'
                }];
        }
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        allowBlank: false,
                        fieldLabel: 'Libellé',
                        margin: 4,
                        bind: {
                            value: '{libelle}'
                        }
                    },
                    {
                        xtype: 'combo',
                        editable: false,
                        allowBlank: false,
                        queryMode: 'local',
                        displayField: 'libelle',
                        valueField: 'code',
                        reference: 'comboSchema',
                        fieldLabel: 'Schéma',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['code', 'libelle'],
                            data:schemaInfos
                        }),
                        margin: 4,
                        bind: {
                            value: '{schema}'
                        },
                        listeners : {
                            change : 'onSchemaChange'
                        }
                    },
                    {
                        xtype: 'combo',
                        editable: false,
                        allowBlank: false,
                        queryMode: 'local',
                        displayField: 'libelle',
                        reference: 'comboTable',
                        valueField: 'code',
                        fieldLabel: 'Table',
                        margin: 4,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['code', 'libelle'],
                            data:[]
                        }),
                        bind: {
                            value: '{table}'
                        }
                    }
                ],
                buttons: buttons
            }
        ];
        this.callParent(arguments);
    }
});
