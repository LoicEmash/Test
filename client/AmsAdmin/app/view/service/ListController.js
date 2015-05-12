Ext.define('AmsAdmin.view.service.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.service-list',
    init : function()
    {
        var gridService = this.lookupReference('gridService');       
         AmsAdmin.getApplication().on('societeEdited',function(){
             gridService.getView().refresh();
         });
    },
    onSelectionChange : function(grid, selected)
    {       
        if (selected.length === 1)
        {
            this.fireViewEvent('selectedServiceChange',selected[0]);
        }
    },
    onItemDoubleClick : function(grid, record)
    {
        if (record !== null && grid !== null)
        {
            this.fireViewEvent('serviceDoubleClick',record);
        }
    }
    
    
});
