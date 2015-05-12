Ext.define('AmsMain.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'AmsMain.view.main.MainController',       
        'AmsAuth.view.Login',
        'Ext.ProgressBar',
        'Ext.ux.statusbar.StatusBar',
        'AmsData.util.Status',
        'AmsLocale.util.Locale',
        'AmsLocale.view.locale.ComboLanguage',
        'AmsAuth.view.AuthToolbar',
        'AmsMain.view.navigation.Panel',
        'AmsMain.view.map.Panel'
        
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
                                                style:'opacity:0;',
                                                width:200,
                                                height:200
                                            }]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1
                                    }
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
                        reference: 'mainPanel',
                        xtype: 'container',
                        layout:'border',
                        
                        hidden: true,
                        items: [,
                            {
                                xtype:'panel',
                                collapsible:true,
                                collapsed:false,
                                border:true,
                                region:'west',
                                width:300,
                                title:'Navigation',
                                layout:{
                                    type:'vbox',
                                    align:'stretch'
                                },
                                items:[
                                    {
                                        xtype:'ams-navigation-panel',
                                        flex:1
                                    }
                                ]
                            },
                            {
                                xtype:'tabpanel',
                                border:true,
                                reference:'mainTabPanel',
                                region:'center',
                                items:[
                                    {
                                         title:'Carte'   ,
                                         xtype:'ams-map'
                                    }
                                ]
                                                            
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
                            text: AmsLocale.util.Locale.txtTitle
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
            ]
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
