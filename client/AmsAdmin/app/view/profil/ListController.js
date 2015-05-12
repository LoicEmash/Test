Ext.define('AmsAdmin.view.profil.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profil-list',
    onSelectionChange : function(grid, selected)
    {
       
        if (selected.length === 1 && grid !== null)
        {
            this.fireViewEvent('selectedProfilChange',selected[0]);
        }
    },
    onItemDoubleClick : function(grid, record)
    {
        if (record !== null && grid !== null)
        {
            this.fireViewEvent('profilDoubleClick',record);
        }
    },
    
});
