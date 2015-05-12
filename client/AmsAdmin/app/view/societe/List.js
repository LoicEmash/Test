
Ext.define("AmsAdmin.view.societe.List", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsAdmin.view.societe.ListController',
        'AmsLocale.util.Locale'
    ],
    xtype: 'ams-societe-list',
    controller: "societe-list",
    layout: 'fit',
    initComponent: function () {

        this.items = [
            {
                xtype: 'grid',
                viewConfig: {
                    loadMask: false
                },
                listeners: {
                    selectionchange: 'onSelectionChange',
                    itemdblclick: 'onItemDoubleClick'
                },
                reference: 'gridSociete',
                columns: [
                    {text: AmsLocale.util.Locale.txtLibelle, menuDisabled: true, dataIndex: 'lib', flex: 1}

                ],
                store: 'AmsAdmin.store.Societe'

            }
        ];
        this.callParent(arguments);
    }

});
