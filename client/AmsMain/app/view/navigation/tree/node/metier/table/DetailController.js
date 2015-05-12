Ext.define('AmsMain.view.navigation.tree.node.metier.table.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigation-tree-node-metier-table-detail',
    requires: [
        'AmsUi.util.EditRecordPanelController',
        'AmsData.util.Model'
    ],
    mixins: {
        recordEditor: 'AmsUi.util.EditRecordPanelController',
    },
    onSchemaChange: function ()
    {
        var comboSchema = this.lookupReference('comboSchema');
        var comboTable = this.lookupReference('comboTable');
        comboTable.clearValue();
        comboTable.getStore().loadData([]);
        var schemaId = comboSchema.getValue();
        if (schemaId !== null)
        {
            var schema = AmsData.util.Model.getSchema(schemaId);
            var tablesInfos = [];
            console.log(schema);

            if (schema !== null)
            {
                for (var k in schema.entities) {
                    if (schema.entities.hasOwnProperty(k)) {
                        var entity = schema.entities[k];
                        tablesInfos.push({
                            code: entity.cls.displayName,
                            libelle: entity.cls.prototype.tableDisplayName
                        });
                    }
                }

            }
            console.log(tablesInfos);
            comboTable.getStore().loadData(tablesInfos);

        }
    }

});
