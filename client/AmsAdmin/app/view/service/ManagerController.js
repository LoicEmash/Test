Ext.define('AmsAdmin.view.service.ManagerController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'AmsLocale.util.Locale'
    ],
    alias: 'controller.service-manager',
    onSelectedServiceChange: function (serviceRecord)
    {
        if (serviceRecord !== null)
        {
            this.showServiceDetail(serviceRecord);
        }
    },
    hideServiceDetail: function ()
    {
        var pnlServiceDetail = this.lookupReference('pnlServiceDetail');
        pnlServiceDetail.collapse();
        pnlServiceDetail.hide();

    },
    showServiceDetail: function (fonctionRecord)
    {
        var pnlServiceDetail = this.lookupReference('pnlServiceDetail');
        var ctlServiceDetail = this.lookupReference('ctlServiceDetail');
        ctlServiceDetail.setRecord(fonctionRecord);
        pnlServiceDetail.show();
        pnlServiceDetail.expand();
    },
    onAddServiceClick: function ()
    {
        this.editService(Ext.create('AmsDomainPrf.model.PrfSvc'), true);
    },
    editService: function (record, isForInsert)
    {
        var me = this;
        var title = AmsLocale.util.Locale.txtEditService;
        if (isForInsert === true)
        {
            title = AmsLocale.util.Locale.txtNewService;
        }
        var window = Ext.create('Ext.window.Window', {
            modal: true,
            iconCls: 'icon-service',
            title: title,
            layout: 'fit',
            items: {// Let's put an empty grid in just to illustrate fit layout
                xtype: 'ams-service-detail',
                readOnly: false,
                record: record,
                listeners: {
                    okClick: function (record)
                    {
                        window.mask(AmsLocale.util.Locale.txtMajDonnees);
                        var serviceStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Service');
                        record.save({
                            callback: function (recordSaved, operation) {
                                if (operation.wasSuccessful()) {
                                    serviceStore.load({
                                        callback: function ()
                                        {
                                            window.unmask();
                                            window.close();
                                            me.showServiceDetail(record);
                                            AmsAdmin.getApplication().fireEvent('serviceEdited');
                                        }
                                    });

                                } else {
                                    window.unmask();
                                    Ext.Msg.alert(AmsLocale.util.Locale.txtErreur, AmsLocale.util.Locale.txtDbErreur);
                                }
                            }
                        });
                    },
                    cancelClick: function ()
                    {
                        window.close();
                    }
                }
            }
        });
        window.show();
    },
    onServiceDoubleClick: function (record)
    {
        this.editService(record, false);
    },
    onEditServiceClick: function ()
    {
        var ctlServiceDetail = this.lookupReference('ctlServiceDetail');
        var record = ctlServiceDetail.getRecord();
        this.editService(record, false);
    },
    onDeleteServiceClick: function ()
    {
        var me = this;
        var serviceList = this.lookupReference('serviceList');
        var gridService = serviceList.getController().lookupReference('gridService');
        var ctlServiceDetail = this.lookupReference('ctlServiceDetail');
        var record = ctlServiceDetail.getRecord();
        var serviceStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Service');
        var lib = record.get('lib');


        Ext.Msg.show({
            title: AmsLocale.util.Locale.txtConfirmDelete,
            message: Ext.util.Format.format(AmsLocale.util.Locale.questionDeleteService, lib),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    serviceStore.remove(record);
                    serviceStore.sync({
                        success: function ()
                        {
                            gridService.getSelectionModel().deselectAll();
                            me.hideServiceDetail();
                        },
                        failure: function ()
                        {
                            Ext.Msg.alert(AmsLocale.util.Locale.txtErreur, AmsLocale.util.Locale.txtDbErreur);
                        }
                    });
                }
            }
        });

    }

});
