
Ext.define("AmsMain.view.navigation.tree.node.tile.Detail", {
    extend: "Ext.panel.Panel",
    controller: "navigation-tree-node-tile-detail",
     xtype: 'ams-navigation-tree-node-tile-detail',
    viewModel: {
        type: "navigation-tree-node-tile-detail"
    },
    requires: [
        'AmsMain.view.navigation.tree.node.tile.DetailController',
        'AmsMain.view.navigation.tree.node.tile.DetailModel',
        'AmsUi.util.EditRecordPanel'
    ],
    mixins: {
        recordEditor: 'AmsUi.util.EditRecordPanel'

    },
    initComponent: function () {
        var buttons = [];
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
                        store: Ext.create('Ext.data.Store', {
                            fields: ['code', 'libelle'],
                            data: [
                                {"code": "osm", "libelle": "Open Street Map"},
                                {"code": "bing_road", "libelle": "Bing Route"},
                                {"code": "bing_aerial", "libelle": "Bing Aérien"},
                                {"code": "bing_aerial_with_labels", "libelle": "Bing Aérien + libellé"},
                                {"code": "mq_osm", "libelle": "MapQuest Route"},
                                {"code": "mq_sat", "libelle": "MapQuest Aérien"},
                                {"code": "mq_hybrid", "libelle": "MapQuest Hybride"}                                

                            ]
                        }),
                        editable: false,
                        allowBlank: false,
                        queryMode: 'local',
                        displayField: 'libelle',
                        valueField: 'code',
                        fieldLabel: 'Type de tuile',
                        margin: 4,
                        bind: {
                            value: '{type}'
                        }
                    }],
                buttons: buttons
            }
        ];
        this.callParent(arguments);
    }
});
