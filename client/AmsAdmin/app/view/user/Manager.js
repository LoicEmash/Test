
Ext.define("AmsAdmin.view.user.Manager", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.user.ManagerController',
        'AmsLocale.util.Locale'
    ],
    xtype: 'ams-user-manager',
    controller: "user-manager",
    layout: 'border',
    initComponent: function () {
        this.setTitle(AmsLocale.util.Locale.txtUtilisateurs)
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
                        xtype: 'ams-user-list',
                        reference: 'userList',
                        flex: 1,
                        listeners: {
                            selectedUserChange: 'onSelectedUserChange',
                            userDoubleClick: 'onUserDoubleClick'
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
                                text:AmsLocale.util.Locale.txtAjouterUtilisateur,
                                iconCls: 'icon-create-big',
                                scale: 'large',
                                margin: 4,
                                handler: 'onAddUserClick'

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
                reference: 'pnlUserDetail',
                title: AmsLocale.util.Locale.txtDetailUtilisateur,
                iconCls: 'icon-user',
                region: 'east',
                collapsible: true,
                border: true,
                hidden: true,
                collapsed: true,
                minWidth: 500,
                width: 500,
                items: [
                    {
                        reference: 'ctlUserDetail',
                        xtype: 'ams-user-detail',
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
                                handler: 'onEditUserClick'

                            },
                            {
                                xtype: 'button',
                                text: AmsLocale.util.Locale.txtSupprimer,
                                iconCls: 'icon-delete-big',
                                scale: 'large',
                                flex: 1,
                                margin: 4,
                                handler: 'onDeleteUserClick'

                            }
                        ]
                    }

                ]
            }
        ];
        this.callParent(arguments);
    }



});
