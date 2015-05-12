
Ext.define("AmsMain.view.navigation.Panel",{
    extend: "Ext.panel.Panel",
    xtype:'ams-navigation-panel',
    requires:[
        'AmsMain.view.navigation.PanelController',
        'AmsMain.view.navigation.PanelModel',
        'AmsMain.view.navigation.tree.Tree',
        'AmsMain.view.navigation.theme.Selector'
    ],
    controller: "navigation-panel",
    viewModel: {
        type: "navigation-panel"
    },
    layout:{
        type:'vbox',
        align:'stretch'
    },
     initComponent: function () {
       
        this.items = [
            {
                xtype:'ams-navigation-theme-selector'
            },
            {
                xtype:'ams-navigation-tree',
                border:true,
                flex:1
            }
        ];
        
        this.callParent(arguments);
    }
   
});
