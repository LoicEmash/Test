Ext.define('AmsMain.view.navigation.tree.node.tile.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigation-tree-node-tile-detail',
    requires:[
        'AmsUi.util.EditRecordPanelController'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanelController'
		
    }
    
});
