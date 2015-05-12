
Ext.define("AmsAdmin.view.user.List", {
    extend: "Ext.panel.Panel",
    requires: [
        "AmsAdmin.view.user.ListController",
        'AmsLocale.util.Locale'
    ],
    xtype: 'ams-user-list',
    controller: "user-list",
    layout: 'fit',
    initComponent: function () {

        this.items = [
            {
                xtype: 'grid',
                viewConfig: {
                    loadMask: false
                },
                reference: 'gridUser',
                listeners: {
                    selectionchange: 'onSelectionChange',
                    itemdblclick: 'onItemDoubleClick'
                },
                columns: [
                    {text: AmsLocale.util.Locale.txtLogin, menuDisabled: true, dataIndex: 'login', flex: 1},
                    {text: AmsLocale.util.Locale.txtNom, menuDisabled: true, dataIndex: 'nom', flex: 1},
                    {text: AmsLocale.util.Locale.txtPrenom, menuDisabled: true, dataIndex: 'prenom', flex: 1},
                    {text: AmsLocale.util.Locale.txtFamDec, menuDisabled: true, dataIndex: 'infFamDec', flex: 1},
                    {text: AmsLocale.util.Locale.txtCdDec, menuDisabled: true, dataIndex: 'infCdDec', flex: 1},
                    {text: AmsLocale.util.Locale.txtSociete, menuDisabled: true, flex: 1, renderer: function (val, meta, record, rowIndex) {
                            var idFonction = record.get('prfPtfoId');
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
                    {text: AmsLocale.util.Locale.txtService, menuDisabled: true, flex: 1, renderer: function (val, meta, record, rowIndex) {
                            var idFonction = record.get('prfPtfoId');
                            var fonctionStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Fonction');
                            var fonctionRec = fonctionStore.findRecord('id', idFonction);
                            var idService = fonctionRec.get('prfSvcId');
                            var serviceStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Service');
                            var serviceRec = serviceStore.findRecord('id', idService);
                            return serviceRec.get('lib');

                        }
                    },
                    {text: AmsLocale.util.Locale.txtFonction, menuDisabled: true, flex: 1, renderer: function (val, meta, record, rowIndex) {
                            var idFonction = record.get('prfPtfoId');
                            var fonctionStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Fonction');
                            var fonctionRec = fonctionStore.findRecord('id', idFonction);
                            return fonctionRec.get('lib');

                        }
                    }
                ],
                store: 'AmsAdmin.store.User'

            }
        ];
        this.callParent(arguments);
    }

});

