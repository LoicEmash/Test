
Ext.define("AmsAdmin.view.fonction.Manager", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.fonction.ManagerController',
        'AmsAdmin.view.fonction.Detail',
        'AmsLocale.util.Locale'
    ],
    xtype: 'ams-fonction-manager',
    controller: "fonction-manager",
    layout: 'border',
    initComponent: function () {

    this.setTitle(AmsLocale.util.Locale.txtFonctions);
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
                        xtype: 'ams-fonction-list',
                        reference: 'fonctionList',
                        flex: 1,
                        listeners: {
                            selectedFonctionChange: 'onSelectedFonctionChange',
                            fonctionDoubleClick: 'onFonctionDoubleClick'
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
                                text: AmsLocale.util.Locale.txtAjouterFonction,
                                iconCls: 'icon-create-big',
                                scale: 'large',
                                margin: 4,
                                handler: 'onAddFonctionClick'

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
                reference: 'pnlFonctionDetail',
                title: AmsLocale.util.Locale.txtDetailFonction,
                iconCls: 'icon-fonction',
                region: 'east',
                collapsible: true,
                border: true,
                hidden: true,
                collapsed: true,
                minWidth: 500,
                width: 500,
                items: [
                    {
                        reference: 'ctlFonctionDetail',
                        xtype: 'ams-fonction-detail',
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
                                iconCls: 'icon-update-big',
                                scale: 'large',
                                flex: 1,
                                margin: 4,
                                handler: 'onEditFonctionClick'

                            },
                            {
                                xtype: 'button',
                                text: AmsLocale.util.Locale.txtSupprimer,
                                iconCls: 'icon-delete-big',
                                scale: 'large',
                                flex: 1,
                                margin: 4,
                                handler: 'onDeleteFonctionClick'

                            }
                        ]
                    }

                ]
            }
        ];
        this.callParent(arguments);
    }

});
