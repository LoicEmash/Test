Ext.define('AmsMain.view.navigation.tree.node.folder.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigation-tree-node-folder-detail',
    requires:[
        'AmsUi.util.EditRecordPanelController'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanelController',
		
    }
    
});
