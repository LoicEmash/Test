Ext.define('AmsMain.view.navigation.tree.menu.ItemMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigation-tree-menu-itemmenu',
    record: null,
    requires:[
        'AmsUi.util.EditRecordService',
        'AmsMain.store.Tree',
        'AmsDomainSig.model.SigTree',
        'AmsMain.view.navigation.tree.node.metier.table.Detail',
        'AmsMain.view.navigation.tree.node.tile.Detail',
        'AmsMain.view.navigation.tree.node.folder.Detail',
        'AmsMain.view.navigation.tree.node.metier.layer.Detail'
  
    ],
    setCurrentRecord: function (record)
    {
        this.record = record;
        var params = this.record.get('jsonParam');
        if (params !== null)
        {
            var jsonParam = Ext.JSON.decode(params);
            var menuAddFolder = this.lookupReference('menuAddFolder');
            var menuAddTile = this.lookupReference('menuAddTile');
            var menuAddMetierLayer = this.lookupReference('menuAddMetierLayer');
            var menuAddMetierTable = this.lookupReference('menuAddMetierTable');
            var menuEdit = this.lookupReference('menuEdit');
            var menuDelete = this.lookupReference('menuDelete');

            if (jsonParam.nodeType === 'folder')
            {
                menuAddFolder.show();
                menuAddTile.show();
                menuAddMetierLayer.show();
                menuAddMetierTable.show();
                menuEdit.show();
                menuDelete.show();
            }
            else
            {
                menuAddFolder.hide();
                menuAddTile.hide();
                menuAddMetierLayer.hide();
                menuAddMetierTable.hide();
                menuEdit.show();
                menuDelete.show();
            }
        }
    },
    onAddFolderClick: function ()
    {
        var record = Ext.create('AmsDomainSig.model.SigTree');
        record.set('parentId', this.record.get('id'));
        record.set('sigThemeId', AmsMain.util.Global.activeThemeId);
        record.set('jsonParam', null);
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsUi.util.EditRecordService.editRecord("Nouveau dossier", 'ams-navigation-tree-node-folder-detail', record, treeStore, function () {
            AmsMain.getApplication().fireEvent('folderAdded');
        });
    }
    ,
    onAddTileClick: function ()
    {
        var record = Ext.create('AmsDomainSig.model.SigTree');
        record.set('parentId', this.record.get('id'));
        record.set('sigThemeId', AmsMain.util.Global.activeThemeId);
        record.set('jsonParam', null);
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsUi.util.EditRecordService.editRecord("Nouvelle couche tuile", 'ams-navigation-tree-node-tile-detail', record, treeStore, function () {
            AmsMain.getApplication().fireEvent('layerAdded');
        });
    },
    onAddMetierTableClick: function ()
    {
        var record = Ext.create('AmsDomainSig.model.SigTree');
        record.set('parentId', this.record.get('id'));
        record.set('sigThemeId', AmsMain.util.Global.activeThemeId);
        record.set('jsonParam', null);
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsUi.util.EditRecordService.editRecord("Nouvelle table metier", 'ams-navigation-tree-node-metier-table-detail', record, treeStore, function () {
              AmsMain.getApplication().fireEvent('tableAdded');
        });

    },
    onEditCurrentClick: function ()
    {
        var params = this.record.get('jsonParam');
        if (params !== null)
        {
            var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
            var jsonParam = Ext.JSON.decode(params, true);
            if (jsonParam !== null)
            {
                if (jsonParam.nodeType === 'folder')
                {


                    AmsUi.util.EditRecordService.editRecord("Modifier un dossier", 'ams-navigation-tree-node-folder-detail', this.record, treeStore, function () {
                        AmsMain.getApplication().fireEvent('folderEdited');
                    });
                }
                else if (jsonParam.nodeType === 'layer')
                {
                    if (jsonParam.layerType === 'tile')
                    {
                        AmsUi.util.EditRecordService.editRecord("Modifier une couche tuile", 'ams-navigation-tree-node-tile-detail', this.record, treeStore, function () {
                            AmsMain.getApplication().fireEvent('layerEdited');
                        });
                    }
                    else if (jsonParam.layerType === 'metier')
                    {
                        AmsUi.util.EditRecordService.editRecord("Modifier une couche metier", 'ams-navigation-tree-node-metier-table-detail', this.record, treeStore, function () {
                            AmsMain.getApplication().fireEvent('layerEdited');
                        });
                    }
                }
                else if (jsonParam.nodeType === 'table')
                {
                    AmsUi.util.EditRecordService.editRecord("Modifier un table metier", 'ams-navigation-tree-node-metier-table-detail', this.record, treeStore, function () {
                         AmsMain.getApplication().fireEvent('tableEdited');
                    });
                    
                }
            }

        }
    },
    onDeleteCurrentClick: function ()
    {
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsUi.util.EditRecordService.deleteRecord("Etes-vous sur de vouloir supprimer le noeud " + this.record.get('lib') + " ?", this.record, treeStore, function () {
            AmsMain.getApplication().fireEvent('nodeRemoved');
        });



    },
    onAddMetierLayerClick : function()
    {
        var record = Ext.create('AmsDomainSig.model.SigTree');
        record.set('parentId', this.record.get('id'));
        record.set('sigThemeId', AmsMain.util.Global.activeThemeId);
        record.set('jsonParam', null);
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsUi.util.EditRecordService.editRecord("Nouvelle couche metier", 'ams-navigation-tree-node-metier-layer-detail', record, treeStore, function () {
              AmsMain.getApplication().fireEvent('layerAdded');
        });
    }
});
