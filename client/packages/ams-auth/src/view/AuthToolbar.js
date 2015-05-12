// @charset UTF8
Ext.define('AmsAuth.view.AuthToolbar', {
    extend: 'Ext.container.Container',
    requires: [
        'AmsLocale.util.Locale',
        'AmsAuth.view.ToolAccount',
        'AmsAuth.view.ToolDisconnect',
        'AmsLocale.view.locale.ComboLanguage',
        'AmsAuth.util.Authentification',
        'AmsMain.view.AuthToolbarController'
    ],
    controller: 'auth-toolbar',
    xtype: 'ams-auth-toolbar',
    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'end'
    },
    initComponent: function () {

        var me = this;
        this.items = [
            {
                xtype: 'image',
                width: 64,
                height: 64,
                margin: 4,
                reference: 'imgAvatar'
            },
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'label',
                        reference: 'lblPrenom',
                        cls: 'x-btn-inner-default-medium'
                    },
                    {
                        xtype: 'label',
                        reference: 'lblNom',
                        cls: 'x-btn-inner-default-medium'
                    },
                    {
                        xtype: 'ams-combo-lang',
                        margin: 4
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'ams-tool-account',
                        width:200,
                        margin: 4,
                    },
                    {
                        xtype: 'ams-tool-disconnect',
                        margin: 4,
                         width:200,
                        listeners: {
                            click: function ()
                            {
                                me.fireEvent('disconnectClick');
                            }
                        }

                    }
                ]
            },
        ];
        this.callParent(arguments);
    }

});
