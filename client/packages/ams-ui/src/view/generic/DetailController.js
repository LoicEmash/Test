Ext.define('AmsUi.view.generic.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.generic-detail',
    requires : [
        'AmsUi.util.EditRecordPanelController'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanelController',
		
    },
    init: function ()
    {
       

    }
    
});
