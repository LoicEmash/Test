
Ext.define("AmsMain.view.navigation.theme.Selector",{
    extend: "Ext.panel.Panel",
    xtype:'ams-navigation-theme-selector',
    requires:[
        'AmsMain.view.navigation.theme.SelectorController',     
        'AmsMain.util.Global',
        'AmsUi.util.Param'
    ],
    controller: "navigation-theme-selector",
    
    layout:{
        type:'vbox',
        align:'stretch'
    },
     initComponent: function () {
       
        this.items = [
            {
                xtype:'combo',
                fieldLabel:'Thème',
                margin:4,
                editable:false,
                valueField:'id',
                reference:'comboTheme',
                displayField:'lib',
                store:'AmsMain.store.Theme',
                listeners : {
                    change : function( combo, newValue)
                    {
                        if (combo !== null)
                        {
                            AmsMain.util.Global.loadTheme(newValue);
                            AmsUi.util.Param.setParam('Sig','SelectedThemeId',newValue);
                        }
                    }
                }
            },
            {
                xtype:'container',
                reference:'panelEditThemeButtons',
                layout:{
                    type:'hbox'
                },
                 hidden:true,
                items:[
                    {
                        xtype:'button',                       
                        margin:4,
                        flex:1,                        
                        text:'Ajouter',
                        handler:'onAddThemeClick'
                    },
                    {
                        xtype:'button',                       
                        margin:4,      
                        reference:'btEditTheme',
                        disabled:true,
                        flex:1,
                        text:'Modifier',
                        handler:'onEditThemeClick'
                    },
                    {
                        xtype:'button',                        
                        margin:4,
                        flex:1,
                        reference:'btDeleteTheme',
                        disabled:true,
                        text:'Supprimer',
                        handler:'onDeleteThemeClick'
                    }
                ]
            }
            
        ];
        
        this.callParent(arguments);
    }
   

   
});
