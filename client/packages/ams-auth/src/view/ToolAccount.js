// @charset UTF8
Ext.define('AmsAuth.view.ToolAccount', {
    requires:[
         'AmsLocale.util.Locale',
         'AmsAuth.view.Account'
    ],
    extend: 'Ext.button.Button',
    xtype: 'ams-tool-account',
   
    scale: 'medium',
    icon: 'resources/icons/24x24/account.png',
    listeners : {
        click:function()
        {
            this.showAccountWindow();
        }
    },
    showAccountWindow : function()
    {
        var window = Ext.create('AmsAuth.view.Account');
        window.show();
    },
    initComponent: function () {

        this.setText(AmsLocale.util.Locale.txtMonCompte);
        this.callParent(arguments);
    }

});
