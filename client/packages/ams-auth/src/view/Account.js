// @charset UTF8
Ext.define('AmsAuth.view.Account', {
    extend: 'Ext.window.Window',
    requires: [
        'AmsLocale.util.Locale',
        'AmsMain.view.AccountController',
        'AmsAuth.util.Authentification'

    ],
    controller: 'auth-account',
    xtype: 'ams-auth-account',
    modal: true,
    minWidth: 300,
    minHeight: 300,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {

        var me = this;
        this.setTitle(AmsLocale.util.Locale.txtTitreCompte);
        var txts = [];
        for (var schemaName in AmsAuth.util.Authentification.userRights) {
            if (AmsAuth.util.Authentification.userRights.hasOwnProperty(schemaName)) {
                var schemaRights = AmsAuth.util.Authentification.userRights[schemaName];
                var txt = Ext.create('Ext.form.field.Text', {
                    readOnly: true,
                    margin: 4,
                    fieldLabel: schemaRights.displayName,
                    value: schemaRights.profil
                });
                txts.push(txt);
            }
        }
        this.items = [
            {
                xtype: 'container',
                items: [{
                        xtype: 'image',
                        width: 64,
                        border: true,
                        height: 64,
                        margin: 4,
                        src: AmsAuth.util.Authentification.userAvatar
                    }]
            },
            {
                xtype: 'textfield',
                readOnly: true,
                margin: 4,
                fieldLabel: AmsLocale.util.Locale.txtNom,
                value: AmsAuth.util.Authentification.userNom
            },
            {
                xtype: 'textfield',
                readOnly: true,
                margin: 4,
                fieldLabel: AmsLocale.util.Locale.txtPrenom,
                value: AmsAuth.util.Authentification.userPrenom
            },
            {
                xtype: 'panel',
                title: 'Profils',
                flex:1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: txts
            }

        ];


        this.callParent(arguments);
    }

});
