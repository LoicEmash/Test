Ext.define("AmsUi.view.generic.Manager", {
    extend: "Ext.panel.Panel",
    controller: "generic-manager",
    requires: [
        'AmsUi.view.generic.Grid',
        'AmsUi.view.generic.Detail',
        'AmsUi.view.generic.Search',
        'AmsUi.view.generic.ManagerController'
    ],
    config: {
        classInfo: null,
        instanceId: null
    },
    layout: 'border',
    initComponent: function () {

        this.items = [
            {
                xtype: 'ams-generic-grid',
                reference: 'genericGrid',
                listeners: {
                    selectionchange: 'onGridSelectionChange',
                    itemdblclick: 'onItemDoubleClick'
                },
                region: 'center',
                dockedItems: [{
                        xtype: 'pagingtoolbar',
                        reference: 'genericDetailPagingToolbar',
                        dock: 'bottom',
                        displayInfo: true
                    }]
            },
            {
                xtype: 'ams-generic-detail',
                reference: 'genericDetail',
                region: 'east',
                collapsible: true,
                readOnly: true,
                minWidth: 200,
                border: true,
                resizable: true,
                collapsed: true,
                classInfo: this.getClassInfo(),
                title: 'Détail'
            },
            {
                xtype: 'ams-generic-search',
                reference: 'genericSearch',
                region: 'east',
                hidden:true,
                collapsible: true,               
                minWidth: 200,
                border: true,
                resizable: true,
                collapsed: true,               
                title: 'Recherche'
            }

        ];

        this.bbar = [
            {
                xtype: 'button',
                text: AmsLocale.util.Locale.txtVider,
                iconCls: 'icon-clear-big',
                scale: 'large',
                reference: 'btClear',
                margin: 4,
                disabled: true,
                handler: 'onClearClick'


            },
            {
                xtype: 'button',
                text: AmsLocale.util.Locale.txtChercher,
                iconCls: 'icon-find-big',
                reference: 'btSearch',
                scale: 'large',
                disabled: true,
                margin: 4,
                handler: 'onSearchClick'


            },
            {
                xtype: 'button',
                text: AmsLocale.util.Locale.txtAjouter,
                iconCls: 'icon-create-big',
                scale: 'large',
                reference: 'btCreate',
                disabled: true,
                margin: 4,
                handler: 'onCreateClick'


            },
            {
                xtype: 'button',
                text: AmsLocale.util.Locale.txtModifier,
                iconCls: 'icon-update-big',
                scale: 'large',
                disabled: true,
                reference: 'btUpdate',
                margin: 4,
                handler: 'onUpdateClick'


            },
            {
                xtype: 'button',
                text: AmsLocale.util.Locale.txtSupprimer,
                iconCls: 'icon-delete-big',
                scale: 'large',
                disabled: true,
                reference: 'btDelete',
                margin: 4,
                handler: 'onDeleteClick'


            }
        ];
        this.callParent(arguments);
    }
});