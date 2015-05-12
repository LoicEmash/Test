Ext.define("AmsAdmin.view.profil.List", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.profil.ListController',
        'AmsLocale.util.Locale'
    ],
    xtype: 'ams-profil-list',
    controller: "profil-list",
    layout: 'fit',
    initComponent: function () {

        this.items = [
            {
                xtype: 'grid',
                viewConfig: {
                    loadMask: false
                },
                reference: 'gridProfil',
                listeners: {
                    selectionchange: 'onSelectionChange',
                    itemdblclick: 'onItemDoubleClick'
                },
                columns: [
                    {text: AmsLocale.util.Locale.txtCode, dataIndex: 'profil', menuDisabled: true, flex: 1},
                    {text: AmsLocale.util.Locale.txtLibelle, dataIndex: 'lib', menuDisabled: true, flex: 1},
                    {text: AmsLocale.util.Locale.txtSchema, flex: 1, menuDisabled: true, renderer: function (val, meta, record, rowIndex) {

                            var idSchema = record.get('prfSchId');
                            var schemaStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Schema');
                            var schemaRec = schemaStore.findRecord('id', idSchema);
                            return schemaRec.get('lib');

                        }
                    },
                    {text: AmsLocale.util.Locale.txtGenre, dataIndex: 'genre', menuDisabled: true, renderer: function (val, meta, record, rowIndex) {

                            if (val === 0)
                            {
                                return AmsLocale.util.Locale.txtGenreSysteme;
                            }
                            else if (val === 1)
                            {
                                return  AmsLocale.util.Locale.txtGenreSysteme;
                            }
                            else
                            {
                                return  AmsLocale.util.Locale.txtGenrePerso;
                            }


                        }
                    }

                ],
                store: 'AmsAdmin.store.Profil'

            }
        ];
        this.callParent(arguments);
    }

});
