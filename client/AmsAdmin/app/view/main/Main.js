Ext.define('AmsAdmin.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'AmsAdmin.view.main.MainController',
        'AmsAuth.view.Login',
        'AmsAuth.view.ToolDisconnect',
        'AmsAuth.view.ToolAccount',
        'AmsAdmin.view.societe.List',
        'AmsAdmin.view.user.List',
        'AmsAdmin.view.service.List',
        'AmsAdmin.view.societe.List',
        'AmsAdmin.view.fonction.List',
        'AmsAdmin.view.user.Detail',
        'AmsAdmin.view.user.Manager',
        'AmsAdmin.view.fonction.Manager',
        'AmsAdmin.view.service.Manager',
        'AmsAdmin.view.societe.Manager',
        'AmsAdmin.view.profil.Manager',
        'AmsAdmin.view.setting.Manager',
        'Ext.ProgressBar',
        'Ext.ux.statusbar.StatusBar',
        'AmsData.util.Status',
        'AmsLocale.util.Locale',
        'AmsLocale.view.locale.ComboLanguage',
        'AmsAuth.view.AuthToolbar'
    ],
    xtype: 'app-main',
    controller: 'main',
    layout: {
        type: 'border'
    },
    
    initComponent: function () {
       
        this.items = [
            {
                xtype: 'container',
                layout: 'card',
                region: 'center',
                reference: 'mainCardPanel',
                items: [
                    {
                        reference: 'waitPanel',
                        xtype: 'container',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [{
                                                xtype: 'image',
                                                reference:'imgEgis',
                                                src: 'resources/E.png',
                                                width:200,
                                                height:200
                                            }]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1
                                    },
                                ]
                            }
                        ],
                        hidden: true
                    },
                    {
                        reference: 'loginPanel',
                        xtype: 'ams-login',
                        hidden: true,
                        listeners: {
                            loginSuccess: 'onLoginSuccess'
                        }

                    }, {
                        reference: 'mainTabPanel',
                        xtype: 'tabpanel',
                        hidden: true,
                        items: [
                            {
                                xtype: 'ams-societe-manager',
                                iconCls: 'icon-factory'
                            },
                            {
                                xtype: 'ams-service-manager',
                                iconCls: 'icon-service'
                            },
                            {
                                xtype: 'ams-fonction-manager',
                                iconCls: 'icon-fonction'
                            },
                            {
                                xtype: 'ams-profil-manager',
                                iconCls: 'icon-profil'
                            },
                            {
                                xtype: 'ams-user-manager',
                                iconCls: 'icon-user'
                            },
                            {
                                xtype: 'ams-setting-manager',
                                iconCls: 'icon-settings'
                            }
                        ]
                    }]
            }
        ];
        this.header = {
            xtype: 'panel',
            height: 80,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'image',
                    src: 'resources/logo.png'

                },
                {
                    xtype: 'container',
                    flex: 1,
                    height: 70,
                    layout: {
                        type: 'vbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            margin: 10,
                            cls: 'lbl-title',
                            text: AmsLocale.util.Locale.txtTitle,
                        }
                    ]
                },
                {
                    xtype: 'ams-auth-toolbar',
                    reference: 'authToolbar',
                    opacity: 0,
                    listeners: {
                        disconnectClick: 'onDisconnectClick'
                    }
                }
            ],
        };


        this.bbar = {
            xtype: 'progressbar',
            id: 'global-progressbar',
            border: true,
            text: '',
            cls: 'left-align',
            minHeight: 24
        };
        this.callParent(arguments);
    }

});
