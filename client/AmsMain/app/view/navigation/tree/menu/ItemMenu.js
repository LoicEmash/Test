
Ext.define("AmsMain.view.navigation.tree.menu.ItemMenu",{
    extend: "Ext.menu.Menu",
    requires:[
        'AmsMain.view.navigation.tree.menu.ItemMenuController'
    ],
    controller: "navigation-tree-menu-itemmenu",    
    setCurrentRecord : function(record)
    {
        this.getController().setCurrentRecord(record);
    },
    initComponent: function () {
        this.items = [
            {
                text: 'Nouveau sous dossier',
                handler:'onAddFolderClick',
                reference:'menuAddFolder'

            },
            {
                text: 'Nouvelle couche tuile' ,
                handler:'onAddTileClick',
                reference:'menuAddTile'

            },
            {
                text: 'Nouvelle couche metier',
                handler:'onAddMetierLayerClick',
                reference:'menuAddMetierLayer'

            },
            {
                text: 'Nouvelle table metier',
                handler:'onAddMetierTableClick',
                reference:'menuAddMetierTable'
                

            },
            {
                text: 'Modifier' ,
                handler:'onEditCurrentClick',
                reference:'menuEdit'

            },
            {
                text: 'Supprimer',
                handler:'onDeleteCurrentClick',
                 reference:'menuDelete'

            }
        ];
        this.callParent(arguments);
    }
    
   
});
