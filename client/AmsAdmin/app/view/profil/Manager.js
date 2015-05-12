Ext.define("AmsAdmin.view.profil.Manager", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.profil.ManagerController',
        'AmsAdmin.view.profil.List',
        'AmsAdmin.view.profil.Detail',
        'AmsLocale.util.Locale'
    ],
    controller: "profil-manager",    
    layout: 'border',
    xtype: 'ams-profil-manager',
    initComponent: function () {
        this.setTitle(AmsLocale.util.Locale.txtProfils);
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
                        xtype: 'ams-profil-list',
                        reference: 'profilList',
                        flex: 1,
                        listeners: {
                            selectedProfilChange: 'onSelectedProfilChange',
                            profilDoubleClick: 'onProfilDoubleClick'
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
                                text: AmsLocale.util.Locale.txtAjouterProfil,
                                iconCls: 'icon-create-big',
                                scale: 'large',
                                margin: 4,
                                handler: 'onAddProfilClick'

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
                reference: 'pnlProfilDetail',
                title: AmsLocale.util.Locale.txtDetailProfil,
                iconCls: 'icon-profil',
                region: 'east',
                collapsible: true,
                border: true,
                hidden: true,
                collapsed: true,
                minWidth: 500,
                width: 500,
                items: [
                    {
                        reference: 'ctlProfilDetail',
                        xtype: 'ams-profil-detail',
                        canEditTableRight: true,
                        canEditFonctionRight: true,
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
                                text:  AmsLocale.util.Locale.txtModifier,
                                iconCls: 'icon-update-big',
                                scale: 'large',
                                flex: 1,
                                margin: 4,
                                handler: 'onEditProfilClick'

                            },
                            {
                                xtype: 'button',
                                text:  AmsLocale.util.Locale.txtSupprimer,
                                iconCls: 'icon-delete-big',
                                scale: 'large',
                                flex: 1,
                                margin: 4,
                                handler: 'onDeleteProfilClick'

                            }
                        ]
                    }

                ]
            }
        ];
        this.callParent(arguments);
    },
});
