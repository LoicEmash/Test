Ext.define('AmsAdmin.view.user.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-list',
    init : function()
    {
        var gridUser = this.lookupReference('gridUser');       
         AmsAdmin.getApplication().on('societeEdited',function(){
             gridUser.getView().refresh();
         });
         AmsAdmin.getApplication().on('serviceEdited',function(){
             gridUser.getView().refresh();
         });
         AmsAdmin.getApplication().on('fonctionEdited',function(){
             gridUser.getView().refresh();
         });
    },
   
    onSelectionChange : function(grid, selected)
    {        
        if (grid !== null && selected.length === 1)
        {this.fireViewEvent('selectedUserChange',selected[0]);}
    },
    onItemDoubleClick : function(grid, record)
    {
        if (record !== null && grid !== null)
        {
            this.fireViewEvent('userDoubleClick',record);
        }
    }
    
});
