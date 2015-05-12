
Ext.define("AmsMain.view.navigation.tree.menu.ContainerMenu", {
    extend: "Ext.menu.Menu",
    requires: [
        'AmsMain.view.navigation.tree.menu.ContainerMenuController'
    ],
    controller: "navigation-tree-menu-containermenu",
    initComponent: function () {
        this.items = [
            {
                text: 'Nouveau dossier',
                handler:'onAddFolderClick'

            },
            {
                text: 'Nouvelle couche tuile' ,
                handler:'onAddTileClick'

            },
            {
                text: 'Nouvelle couche metier',
                handler:'onAddMetierLayerClick'

            },
            {
                text: 'Nouvelle table metier',
                handler:'onAddMetierTableClick'

            }
        ];
        this.callParent(arguments);
    }

});
