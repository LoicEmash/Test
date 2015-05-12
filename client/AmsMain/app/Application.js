/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('AmsMain.Application', {
    extend: 'Ext.app.Application',
    requires:[
       'AmsAuth.util.Authentification',
       'AmsData.data.proxy.SecureRestProxy',       
       'Ext.grid.*',
       'Ext.form.field.*'
    ],
    name: 'AmsMain',

    stores: [
       'AmsMain.store.Theme',
       'AmsMain.store.Tree'
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});
