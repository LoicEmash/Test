// @charset UTF8
Ext.define('AmsAuth.view.ToolDisconnect', {
    requires: [
        'AmsLocale.util.Locale'
    ],
    extend: 'Ext.button.Button',
    xtype: 'ams-tool-disconnect',
    text: 'Déconnexion',
    scale: 'medium',
    icon: 'resources/icons/24x24/disconnect.png',
    initComponent: function () {

        this.setText(AmsLocale.util.Locale.txtDeconnexion);

        this.callParent(arguments);
    }
});
