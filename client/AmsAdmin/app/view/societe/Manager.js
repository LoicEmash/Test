
Ext.define("AmsAdmin.view.societe.Manager", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.societe.ManagerController',
        'AmsAdmin.view.societe.Detail',
         'AmsLocale.util.Locale'
    ],
    controller: "societe-manager",
    xtype: 'ams-societe-manager',
    layout: 'border',
   
    initComponent: function () {

        this.setTitle(AmsLocale.util.Locale.txtSocietes);
        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'ams-societe-list',
                        reference: 'societeList',
                        flex: 1,
                        listeners: {
                            selectedSocieteChange: 'onSelectedSocieteChange',
                            societeDoubleClick: 'onSocieteDoubleClick'
                        }
                    },
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'button',
                                text: AmsLocale.util.Locale.txtAjouterSociete,
                                iconCls: 'icon-create-big',
                                scale: 'large',
                                margin: 4,
                                handler: 'onAddSocieteClick'

                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                reference: 'pnlSocieteDetail',
                iconCls: 'icon-factory',
                title: AmsLocale.util.Locale.txtDetailSociete,
                region: 'east',
                collapsible: true,
                border: true,
                hidden: true,
                collapsed: true,
                minWidth: 500,
                width: 500,
                items: [
                    {
                        reference: 'ctlSocieteDetail',
                        xtype: 'ams-societe-detail',
                        flex: 1

                    },
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'button',
                                text: AmsLocale.util.Locale.txtModifier,
                                scale: 'large',
                                flex: 1,
                                margin: 4,
                                iconCls: 'icon-update-big',
                                handler: 'onEditSocieteClick'

                            },
                            {
                                xtype: 'button',
                                text: AmsLocale.util.Locale.txtSupprimer,
                                scale: 'large',
                                flex: 1,
                                iconCls: 'icon-delete-big',
                                margin: 4,
                                handler: 'onDeleteSocieteClick'

                            }
                        ]
                    }

                ]
            }
        ];
        this.callParent(arguments);
    }

});
