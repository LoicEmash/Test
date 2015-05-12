Ext.define("AmsAdmin.view.service.List", {
    extend: "Ext.panel.Panel",
    requires: [
        "AmsAdmin.view.service.ListController"
    ],
    xtype: 'ams-service-list',
    controller: "service-list",
    layout: 'fit',
    initComponent: function () {

        this.items = [
            {
                xtype: 'grid',
                reference: 'gridService',
                viewConfig: {
                    loadMask: false
                },
                listeners: {
                    selectionchange: 'onSelectionChange',
                    itemdblclick: 'onItemDoubleClick'
                },
                columns: [
                    {text: AmsLocale.util.Locale.txtLibelle, menuDisabled: true, dataIndex: 'lib', flex: 1},
                    {text: AmsLocale.util.Locale.txtSociete, menuDisabled: true, flex: 1, renderer: function (val, meta, record, rowIndex) {

                            var idSociete = record.get('prfSteId');
                            var societeStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Societe');
                            var societeRec = societeStore.findRecord('id', idSociete);
                            return societeRec.get('lib');

                        }
                    }

                ],
                store: 'AmsAdmin.store.Service'

            }
        ];
        this.callParent(arguments);
   },
});
