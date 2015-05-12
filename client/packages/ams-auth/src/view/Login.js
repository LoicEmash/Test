// @charset UTF8
Ext.define('AmsAuth.view.Login', {
    extend: 'Ext.panel.Panel',
    requires: [
        'AmsMain.view.LoginController',
        'AmsMain.view.LoginModel',
        'AmsLocale.util.Locale'
    ],
    xtype: 'ams-login',
    controller: 'login',
    viewModel: {
        type: 'login'
    },
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    initComponent: function () {

        this.items = [
            {
                xtype: 'panel',
                title: AmsLocale.util.Locale.txtAuthentification,
                border: true,
                items: [{
                        xtype: 'form',
                        items: [
                            {
                                xtype: 'textfield',
                                reference: 'txtLogin',
                                allowBlank: false,
                                minLength: 2,
                                fieldLabel:AmsLocale.util.Locale.txtLogin,
                                labelWidth: 150,
                                margin: 4,
                                bind: {
                                    value: '{login}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                allowBlank: false,
                                reference: 'txtPassword',
                                fieldLabel:AmsLocale.util.Locale.txtPassword,
                                inputType: 'password',
                                labelWidth: 150,
                                minLength: 2,
                                margin: 4,
                                bind: {
                                    value: '{password}'
                                }
                            }
                        ], buttons: [
                            {
                                text: AmsLocale.util.Locale.txtConnexion,
                                formBind: true,
                                disabled: true,
                                scale: 'medium',
                                icon: 'resources/icons/24x24/connect.png',
                                handler: 'onConnectButtonClick'

                            }]


                    }]
            }
        ];
        this.callParent(arguments);
    }

});
