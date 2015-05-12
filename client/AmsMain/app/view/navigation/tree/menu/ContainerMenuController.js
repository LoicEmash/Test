Ext.define('AmsMain.view.navigation.tree.menu.ContainerMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigation-tree-menu-containermenu',
    requires:[
        'AmsUi.util.EditRecordService',
        'AmsMain.store.Tree',
        'AmsDomainSig.model.SigTree',
        'AmsMain.view.navigation.tree.node.metier.table.Detail',
        'AmsMain.view.navigation.tree.node.tile.Detail',
        'AmsMain.view.navigation.tree.node.folder.Detail',
        'AmsMain.view.navigation.tree.node.metier.layer.Detail'
  
    ],
    onAddFolderClick : function()
    {
        var record = Ext.create('AmsDomainSig.model.SigTree');
        record.set('parentId',null);
        record.set('sigThemeId',AmsMain.util.Global.activeThemeId);
        record.set('jsonParam',null);
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsUi.util.EditRecordService.editRecord("Nouveau dossier", 'ams-navigation-tree-node-folder-detail', record, treeStore, function () {
            AmsMain.getApplication().fireEvent('folderAdded');
        });
    },
    onAddTileClick : function()
    {
        var record = Ext.create('AmsDomainSig.model.SigTree');
        record.set('parentId',null);
        record.set('sigThemeId',AmsMain.util.Global.activeThemeId);
        record.set('jsonParam',null);
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsUi.util.EditRecordService.editRecord("Nouvelle couche tuile", 'ams-navigation-tree-node-tile-detail', record, treeStore, function () {
            AmsMain.getApplication().fireEvent('layerAdded');
        });
    },   
    onAddMetierTableClick : function()
    {
        var record = Ext.create('AmsDomainSig.model.SigTree');
        record.set('parentId',null);
        record.set('sigThemeId',AmsMain.util.Global.activeThemeId);
        record.set('jsonParam',null);
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
         AmsUi.util.EditRecordService.editRecord("Nouvelle table metier", 'ams-navigation-tree-node-metier-table-detail', record, treeStore, function () {
              AmsMain.getApplication().fireEvent('tableAdded');
        });
        
    },
    onAddMetierLayerClick : function()
    {
        var record = Ext.create('AmsDomainSig.model.SigTree');
        record.set('parentId', null);
        record.set('sigThemeId', AmsMain.util.Global.activeThemeId);
        record.set('jsonParam', null);
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsUi.util.EditRecordService.editRecord("Nouvelle couche metier", 'ams-navigation-tree-node-metier-layer-detail', record, treeStore, function () {
              AmsMain.getApplication().fireEvent('layerAdded');
        });
    }
    
});
