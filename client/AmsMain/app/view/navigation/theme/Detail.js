
Ext.define("AmsMain.view.navigation.theme.Detail", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsMain.view.navigation.theme.DetailController',
        'AmsMain.view.navigation.theme.DetailModel',
        'AmsUi.util.EditRecordPanel'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanel',
		
    },
    xtype: 'ams-navigation-theme-detail',
    controller: "navigation-theme-detail",
    viewModel: {
        type: "navigation-theme-detail"
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
                modelValidation: true,
                items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Code',
                        margin: 4,
                        allowBlank: false,
                        minLength: 2,
                        maxLength: 100,
                        bind: {
                            value: '{code}'
                        }

                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Libellé',
                        margin: 4,
                        allowBlank: false,
                        minLength: 2,
                        maxLength: 100,
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
