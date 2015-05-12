Ext.define('AmsAdmin.view.societe.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.societe-list',
     onSelectionChange : function(grid, selected)
    {
       
        if (selected.length === 1)
        {
            this.fireViewEvent('selectedSocieteChange',selected[0]);
        }
    },
    onItemDoubleClick : function(grid, record)
    {
        if (record !== null && grid !== null)
        {
            this.fireViewEvent('societeDoubleClick',record);
        }
    }
    
});
