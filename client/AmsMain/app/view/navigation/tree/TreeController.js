Ext.define('AmsMain.view.navigation.tree.TreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigation-tree-tree',
    requires: [
        'AmsMain.util.Global',
        'AmsAuth.util.Authentification',
        'AmsMain.view.navigation.tree.node.folder.Detail',
        'AmsMain.view.navigation.tree.node.tile.Detail',
        'AmsMain.view.navigation.tree.node.metier.layer.Detail',
        'AmsMain.view.navigation.tree.node.metier.table.Detail',
        'AmsMain.view.navigation.tree.menu.ContainerMenu',
        'AmsMain.view.navigation.tree.menu.ItemMenu'
    ],
    containerMenu: null,
    itemMenu: null,
    handleSelectionChange: true,
    handleCheckChange: true,
    init: function ()
    {
        var me = this;
         AmsMain.getApplication().on('tableAdded', function () {
            me.createNodes.call(me);
        });
         AmsMain.getApplication().on('tableEdited', function () {
            me.createNodes.call(me);
        });
        AmsMain.getApplication().on('folderAdded', function () {
            me.createNodes.call(me);
        });
        AmsMain.getApplication().on('layerAdded', function () {
            me.createNodes.call(me);
        });
        AmsMain.getApplication().on('nodeRemoved', function () {
            me.createNodes.call(me);
        });
        AmsMain.getApplication().on('folderEdited', function () {
            me.createNodes.call(me);
        });
        AmsMain.getApplication().on('layerEdited', function () {
            me.createNodes.call(me);
        });
         AmsMain.getApplication().on('layerEdited', function () {
            me.createNodes.call(me);
        });
        this.containerMenu = Ext.create('AmsMain.view.navigation.tree.menu.ContainerMenu');
        this.itemMenu = Ext.create('AmsMain.view.navigation.tree.menu.ItemMenu');
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        AmsMain.util.Global.on('activeThemeChange', function () {
            treeStore.clearFilter(true);
            treeStore.addFilter({
                property: 'sigThemeId',
                value: AmsMain.util.Global.activeThemeId
            }, true);
            treeStore.load({
                callback: function ()
                {

                    me.createNodes.call(me);

                    AmsMain.util.Global.fireEvent('activeThemeLoaded');
                }
            });
        });
    },
    onItemDoubleClick: function (tree, record, item, index, e, eOpts)
    {
       
        var treeRecord = record.data.record;
        if (record.get('jsonParam') !== null)
        {
            var params = Ext.JSON.decode(treeRecord.get('jsonParam'), true);
          
            if (params !== null)
            {
                if (params.nodeType === 'table')
                {
                    var classInfo = Ext.ClassManager.get(params.table);                   
                    AmsMain.util.Global.fireEvent('openTableMetier',classInfo);               
                }
            }

        }
    },
    onSelectionChange: function (tree, selected, eOpts)
    {
        if (selected.length === 1)
        {
            if (this.handleSelectionChange === true)
            {
                var selection = selected[0];
                var id = selection.data.record.get('id');
                AmsUi.util.Param.setParam('Sig', 'SelectedNodeId', id);
            }

        }

    },
    createNodes: function ()
    {
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        var view = this.getView();
        var rootNode = view.getRootNode();
        rootNode.removeAll();
        this.handleSelectionChange = false;
        this.handleCheckChange = false;
        var selectedNodeId = AmsUi.util.Param.getParam('Sig', 'SelectedNodeId', null);
        console.log('selectedNodeId ' + selectedNodeId);
        this.recurseCreateNodes(rootNode, treeStore, null, selectedNodeId);
        this.handleSelectionChange = true;
        this.handleCheckChange = true;

    },
    recurseCreateNodes: function (parentNode, treeStore, parentId, selectedNodeId)
    {
        var me = this;

        treeStore.each(function (item) {
            var id = item.get('id');

            if (item.get('parentId') === parentId)
            {
                if (item.get('jsonParam') !== null)
                {
                    var params = Ext.JSON.decode(item.get('jsonParam'));
                    if (params.nodeType === 'folder')
                    {
                        var expanded = AmsUi.util.Param.getParam('Sig', 'Node_' + id + '_Expanded', '0') === '1';
                        var child = parentNode.appendChild({
                            text: item.get('lib'),
                            record: item,
                            expanded: expanded
                        });

                        if (id.toString() === selectedNodeId)
                        {

                            me.getView().getSelectionModel().select(child);
                        }
                        me.recurseCreateNodes(child, treeStore, item.get('id'), selectedNodeId);

                    }
                    else if (params.nodeType === 'table')
                    {

                        var child = parentNode.appendChild({
                            text: item.get('lib'),
                            checked: checked,
                            leaf: true,
                            record: item
                        });
                    }
                    else if (params.nodeType === 'layer')
                    {
                        var checked = AmsUi.util.Param.getParam('Sig', 'Node_' + id + '_Checked', '0') === '1';
                        var child = parentNode.appendChild({
                            text: item.get('lib'),
                            checked: checked,
                            leaf: true,
                            record: item
                        });


                    }

                }

            }
            if (id.toString() === selectedNodeId)
            {

                me.getView().getSelectionModel().select(child);
            }
        });
    },
    onItemCheckChange: function (node, checked, eOpts)
    {
        var me = this;
        if (this.handleCheckChange === true)
        {
            this.handleCheckChange = false;
            var record = node.data.record;
            if (record !== undefined)
            {
                var id = record.get('id');
                var code = "Node_" + id + "_Checked";

                if (checked === true)
                {
                    var setters = [];

                    var jsonParam = record.get('jsonParam');

                    if (jsonParam !== null)
                    {
                        var params = Ext.JSON.decode(jsonParam, true);
                        if (params !== null)
                        {
                            if (params.layerType === 'tile')
                            {
                                var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
                                treeStore.each(function (r) {
                                    if (AmsMain.util.Global.isTreeRecordLayerTile(r))
                                    {
                                        var itemId = r.get('id');

                                        if (parseInt(itemId) !== parseInt(id))
                                        {
                                            code = "Node_" + itemId + "_Checked";
                                            setters.push({
                                                schema: 'Sig',
                                                code: code,
                                                value: '0'
                                            });
                                            var treeNode = me.getTreeNodeById(itemId);
                                            if (treeNode !== null)
                                            {

                                                treeNode.set('checked', false);

                                            }


                                        }
                                    }

                                });
                            }
                        }
                    }
                    code = "Node_" + id + "_Checked";
                    setters.push({
                        schema: 'Sig',
                        code: code,
                        value: '1'
                    });
                    me.getView().mask('mise à jour ...');

                    AmsUi.util.Param.setParams(setters, function () {
                        me.handleCheckChange = true;
                        me.getView().unmask();
                        AmsMain.util.Global.fireEvent('nodeCheckChange');
                    });



                }
                else
                {
                    me.getView().mask('mise à jour ...');
                    AmsUi.util.Param.setParam('Sig', code, '0', true, function () {
                        me.handleCheckChange = true;
                        me.getView().unmask();
                        AmsMain.util.Global.fireEvent('nodeCheckChange');
                    });

                }


            }
        }
    },
    getTreeNodeById: function (id)
    {
        var view = this.getView();
        var rootNode = view.getRootNode();
        var node = null;
        rootNode.cascadeBy({
            before: function (item)
            {
                if (item.data !== null && item.data.record !== undefined && item.data.record.get('id') === id)
                {
                    node = item;
                }
                return true;

            }
        });
        return node;
    },
    onItemExpand: function (node, eOpts)
    {
        if (this.handleSelectionChange === true)
        {
            var record = node.data.record;
            if (record !== undefined)
            {
                var id = record.get('id');
                var code = "Node_" + id + "_Expanded";
                AmsUi.util.Param.setParam('Sig', code, '1');
            }
        }

    },
    onItemCollapse: function (node, eOpts)
    {
        if (this.handleSelectionChange === true)
        {
            var record = node.data.record;
            if (record !== undefined)
            {
                var id = record.get('id');
                var code = "Node_" + id + "_Expanded";
                AmsUi.util.Param.setParam('Sig', code, '0');
            }
        }

    },
    onContainerContextMenuClick: function (sc, event, eOpts)
    {
        if (AmsAuth.util.Authentification.canEditSigTheme() === true && AmsMain.util.Global.activeThemeId !== null)
        {
            var xy = event.getXY();
            xy[0] = xy[0] - 10;
            xy[1] = xy[1] - 10;
            this.containerMenu.showAt(xy);
        }

        event.stopEvent();

    },
    onItemContextMenuClick: function (sc, record, item, index, event, eOpts)
    {
        this.containerMenu.hide();
        var xy = event.getXY();
        xy[0] = xy[0] - 10;
        xy[1] = xy[1] - 10;
        var record = record.data.record;
        console.log(record);
        this.itemMenu.setCurrentRecord(record);
        this.itemMenu.showAt(xy);
        event.stopEvent();

    },
    onContainerClick: function ()
    {
        this.containerMenu.hide();
    }

});
