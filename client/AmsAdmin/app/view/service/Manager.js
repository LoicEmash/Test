Ext.define("AmsAdmin.view.service.Manager", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.service.ManagerController',
        'AmsAdmin.view.service.Detail',
       'AmsLocale.util.Locale'
    ],
    xtype: 'ams-service-manager',
    controller: "service-manager",
    layout: 'border',
    title: 'Services',
    initComponent: function () {

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
                        xtype: 'ams-service-list',
                        reference: 'serviceList',
                        flex: 1,
                        listeners: {
                            selectedServiceChange: 'onSelectedServiceChange',
                            serviceDoubleClick: 'onServiceDoubleClick'
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
                                text: AmsLocale.util.Locale.txtAjouterService,
                                iconCls: 'icon-create-big',
                                scale: 'large',
                                margin: 4,
                                handler: 'onAddServiceClick'

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
                reference: 'pnlServiceDetail',
                iconCls: 'icon-service',
                title: AmsLocale.util.Locale.txtDetailService,
                region: 'east',
                collapsible: true,
                border: true,
                hidden: true,
                collapsed: true,
                minWidth: 500,
                width: 500,
                items: [
                    {
                        reference: 'ctlServiceDetail',
                        xtype: 'ams-service-detail',
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
                                handler: 'onEditServiceClick'

                            },
                            {
                                xtype: 'button',
                                text: AmsLocale.util.Locale.txtSupprimer,
                                iconCls: 'icon-delete-big',
                                scale: 'large',
                                flex: 1,
                                margin: 4,
                                handler: 'onDeleteServiceClick'

                            }
                        ]
                    }

                ]
            }
        ];
        this.callParent(arguments);
    }

});
