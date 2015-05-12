// @charset UTF8
Ext.define('AmsMain.view.LoginController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'AmsAuth.util.Authentification',
        'Ext.window.MessageBox',
        'AmsAuth.crypto.Sha1',
        'AmsLocale.util.Locale'
    ],
    alias: 'controller.login',
    onConnectButtonClick: function ()
    {
        var me = this;
        var login = this.getViewModel().get('login');
        var password = this.getViewModel().get('password');   
        var sha1Password = AmsAuth.crypto.Sha1.hash(password);
        me.getView().mask(AmsLocale.util.Locale.txtAuthentification+' ...');
        AmsAuth.util.Authentification.authenticate(login, sha1Password,
                function (apiKey) {
                    me.onAuthenticateSuccess.call(me, apiKey);
                },
                function (title, message) {
                    me.onAuthenticateFailure.call(me, title, message);
                });

    },
    onAuthenticateSuccess: function (apiKey)
    {
        this.getView().unmask();
        this.fireViewEvent('loginSuccess');
    },
    onAuthenticateFailure: function (title, message)
    {
        this.getView().unmask();
        Ext.Msg.alert(title, message);
    }
});
