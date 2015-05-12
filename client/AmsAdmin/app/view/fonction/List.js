
Ext.define("AmsAdmin.view.fonction.List", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.fonction.ListController',
        'AmsLocale.util.Locale'
    ],
    xtype: 'ams-fonction-list',
    controller: "fonction-list",
    layout: 'fit',
    initComponent: function () {


        this.items = [
            {
                xtype: 'grid',
                reference: 'gridFonction',
                viewConfig: {
                    loadMask: false
                },
                listeners: {
                    selectionchange: 'onSelectionChange',
                    itemdblclick: 'onItemDoubleClick'
                },
                columns: [
                    {text: AmsLocale.util.Locale.txtLibelle, dataIndex: 'lib', flex: 1, menuDisabled: true},
                    {text: AmsLocale.util.Locale.txtSociete, flex: 1, menuDisabled: true, renderer: function (val, meta, record, rowIndex) {
                            var idFonction = record.get('id');
                            var fonctionStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Fonction');
                            var fonctionRec = fonctionStore.findRecord('id', idFonction);
                            var idService = fonctionRec.get('prfSvcId');
                            var serviceStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Service');
                            var serviceRec = serviceStore.findRecord('id', idService);
                            var idSociete = serviceRec.get('prfSteId');
                            var societeStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Societe');
                            var societeRec = societeStore.findRecord('id', idSociete);
                            return societeRec.get('lib');

                        }
                    },
                    {text: AmsLocale.util.Locale.txtService, flex: 1, menuDisabled: true, renderer: function (val, meta, record, rowIndex) {
                            var idFonction = record.get('id');
                            var fonctionStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Fonction');
                            var fonctionRec = fonctionStore.findRecord('id', idFonction);
                            var idService = fonctionRec.get('prfSvcId');
                            var serviceStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Service');
                            var serviceRec = serviceStore.findRecord('id', idService);
                            return serviceRec.get('lib');

                        }
                    }

                ],
                store: 'AmsAdmin.store.Fonction'

            }
        ];
        this.callParent(arguments);
    }

});
