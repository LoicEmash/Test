Ext.define('AmsAdmin.view.fonction.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fonction-list',
    init : function()
    {
        var gridFonction = this.lookupReference('gridFonction');       
        AmsAdmin.getApplication().on('societeEdited',function(){
             gridFonction.getView().refresh();
         });
        AmsAdmin.getApplication().on('serviceEdited',function(){
             gridFonction.getView().refresh();
         });
    },
    onItemDoubleClick : function(grid, record)
    {
        if (record !== null && grid !== null)
        {
            this.fireViewEvent('fonctionDoubleClick',record);
        }
    },
     onSelectionChange : function(grid, selected)
    {
        console.log('onSelectionChange');
        if (selected.length === 1)
        {
            this.fireViewEvent('selectedFonctionChange',selected[0]);
        }
    }
    
});
