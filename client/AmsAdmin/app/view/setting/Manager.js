
Ext.define("AmsAdmin.view.setting.Manager", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.setting.ManagerController',
        'AmsAdmin.view.setting.ManagerModel',
        'AmsLocale.util.Locale'
    ],
    controller: "setting-manager",
    viewModel: {
        type: "setting-manager"
    },
    xtype: 'ams-setting-manager',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent: function () {

        this.setTitle(AmsLocale.util.Locale.txtConfiguration);
        this.items = [
            {
                xtype:'form',
                title:'Limites géographiques générales au format WGS',
                items:[
                    {
                        xtype:'numberfield',
                        fieldLabel :'Min X',
                        allowBlank:false,
                        margin:4,
                        decimalPrecision:8
                    },
                    {
                        xtype:'numberfield',
                        fieldLabel :'Min Y',
                        allowBlank:false,
                        margin:4,
                        decimalPrecision:8              
                    },
                    {
                        xtype:'numberfield',
                        allowBlank:false,
                        fieldLabel :'Max X',
                        margin:4,
                        decimalPrecision:8                        
                    },
                    {
                        xtype:'numberfield',
                        allowBlank:false,
                        fieldLabel :'Max Y',
                        margin:4,
                        decimalPrecision:8                     
                    }
                ],
                buttons : [
                    {
                        xtype:'button',
                        text:'Mettre à jour',
                        formBind:true,
                        handler:'onUpdateGlobalExtendClick'
                    }
                ]
            },
            {
                xtype:'button',
                scale: 'medium',
                margin:2,
                text:'Exporter les données',
                handler:'onExportData'
            }
        ];
        this.callParent(arguments);
    }
});
