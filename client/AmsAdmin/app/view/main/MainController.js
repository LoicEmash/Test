/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('AmsAdmin.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'AmsData.util.Model',
        'AmsAuth.util.Authentification',
        'AmsLocale.util.Locale'
    ],
    alias: 'controller.main',
    init: function ()
    {
        var me = this;
        me.getView().hide();
        AmsAuth.util.Authentification.authenticateFromCookies(function () {
            me.onLoginSuccess.call(me);
            me.getView().show();
        }, function () {
            me.showLoginPanel();
            me.getView().show();
        });
        AmsData.util.Status.setText('');


    },
    egisAnimRunning: false,
    startAnimEgis: function ()
    {
        this.egisAnimRunning = true;
        this.fadeOutAnim();
    },
    stopAnimEgis: function ()
    {
        this.egisAnimRunning = false;
        this.fadeOutAnim();
    },
    fadeOutAnim: function ()
    {
        var me = this;
        var imgEgis = this.lookupReference('imgEgis');
        imgEgis.getEl().fadeOut({
            opacity: 0,
            easing: 'easeOut',
            duration: 300,
            remove: false,
            useDisplay: false,
            callback: function ()
            {
                if (me.egisAnimRunning)
                {
                    me.fadeInAnim.call(me);
                }
            }
        });
    },
    fadeInAnim: function ()
    {
        var me = this;
        var imgEgis = this.lookupReference('imgEgis');
        imgEgis.getEl().fadeIn({
            opacity: 1,
            easing: 'easeIn',
            duration: 300,
            remove: false,
            useDisplay: false,
            callback: function ()
            {
                if (me.egisAnimRunning)
                {
                    me.fadeOutAnim.call(me);
                }
            }
        });
    },
    onLoginSuccess: function ()
    {
        if (AmsAuth.util.Authentification.canConnectToAdmin() === false)
        {
            Ext.Msg.alert('Accès interdit', 'Vous n\'êtes pas autorisé à accéder a l\'administration.');
            this.showLoginPanel();
        }
        else
        {
            this.startAnimEgis();
            this.showWaitPanel();
            var stores = [];
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.Societe'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.Service'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.Fonction'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.User'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.Schema'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.Profil'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.Table'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.Feature'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.ProfilTable'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.ProfilFeature'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.UserProfil'));
            stores.push(Ext.data.StoreManager.lookup('AmsAdmin.store.Param'));
            
            
            AmsData.util.Model.chainLoad(stores, this.onSuccessLoadNeedestStore, this.onFailureLoadNeedestStore, this);
        }


    },
    onSuccessLoadNeedestStore: function ()
    {
        this.stopAnimEgis();
        this.showMainTabPanel();
        AmsAdmin.getApplication().fireEvent('logginSuccess');

    },
    onFailureLoadNeedestStore: function ()
    {
        this.stopAnimEgis();
        this.showLoginPanel();
    },
    onDisconnectClick: function ()
    {
        this.showLoginPanel();
    },
    showWaitPanel: function ()
    {
        var authToolbar = this.lookupReference('authToolbar');
        var mainCardPanel = this.lookupReference('mainCardPanel');
        var waitPanel = this.lookupReference('waitPanel');
        authToolbar.getEl().setOpacity(0);
        mainCardPanel.setActiveItem(waitPanel);
    },
    showMainTabPanel: function ()
    {

        var mainTabPanel = this.lookupReference('mainTabPanel');
        var authToolbar = this.lookupReference('authToolbar');

        var mainCardPanel = this.lookupReference('mainCardPanel');
        authToolbar.getEl().setOpacity(1);

        mainTabPanel.getEl().setOpacity(0);
        mainCardPanel.setActiveItem(mainTabPanel);

        mainTabPanel.getEl().fadeIn({
            opacity: 1,
            easing: 'easeIn',
            duration: 300,
            remove: false,
            useDisplay: false,
            callback: function ()
            {
            }
        });

    },
    showLoginPanel: function ()
    {
        var loginPanel = this.lookupReference('loginPanel');
        var authToolbar = this.lookupReference('authToolbar');


        var mainCardPanel = this.lookupReference('mainCardPanel');

        if (authToolbar !== null)
        {
            authToolbar.getEl().setOpacity(0);
        }

        mainCardPanel.setActiveItem(loginPanel);
    }

});
