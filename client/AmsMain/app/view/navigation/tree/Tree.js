Ext.define("AmsMain.view.navigation.tree.Tree",{
    extend: "Ext.tree.Panel",
    xtype:'ams-navigation-tree',
    requires:['AmsMain.view.navigation.tree.TreeController'],
    controller: "navigation-tree-tree",
    rootVisible:false,
    listeners : {
        containercontextmenu : 'onContainerContextMenuClick',
        itemcontextmenu : 'onItemContextMenuClick',
        conainterclick : 'onContainerClick',
        selectionchange : 'onSelectionChange',
        itemexpand:'onItemExpand',
        itemcollapse:'onItemCollapse',
        checkchange : 'onItemCheckChange',
        itemdblclick:'onItemDoubleClick'
    }
    
});
