
Ext.define("AmsMain.view.navigation.tree.node.folder.Detail", {
    extend: "Ext.panel.Panel",
    xtype: 'ams-navigation-tree-node-folder-detail',
    controller: "navigation-tree-node-folder-detail",
    viewModel: {
        type: "navigation-tree-node-folder-detail"
    },
    requires: [
        'AmsMain.view.navigation.tree.node.folder.DetailController',
        'AmsMain.view.navigation.tree.node.folder.DetailModel',
        'AmsUi.util.EditRecordPanel'
    ],
    mixins: {
        recordEditor: 'AmsUi.util.EditRecordPanel'

    },
    initComponent: function () {
        var buttons = [];
        if (this.getReadOnly() === false)
        {
            buttons = [{
                    text: AmsLocale.util.Locale.txtCancel,
                    hidden: this.getReadOnly(),
                    scale: 'medium',
                    iconCls: 'icon-cancel-medium',
                    handler: 'onCancelClick'
                }, {
                    text: AmsLocale.util.Locale.txtOk,
                    hidden: this.getReadOnly(),
                    scale: 'medium',
                    iconCls: 'icon-ok-medium',
                    formBind: true,
                    disabled: true,
                    handler: 'onOkClick'
                }];
        }
        this.items = [
            {
                xtype: 'form',
                items: [{
                        xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: 'Libellé',
                        margin: 4,
                        bind: {
                            value: '{libelle}'
                        }
                    }],
                buttons: buttons
            }
        ];
        this.callParent(arguments);
    }
});
