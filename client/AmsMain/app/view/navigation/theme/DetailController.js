Ext.define('AmsMain.view.navigation.theme.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigation-theme-detail',
    requires:[
        'AmsUi.util.EditRecordPanelController'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanelController',
		
    }
    
    
});
