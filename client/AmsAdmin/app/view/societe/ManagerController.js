Ext.define('AmsAdmin.view.societe.ManagerController', {
    extend: 'Ext.app.ViewController',
    requires:[
        'AmsLocale.util.Locale'
    ],
    alias: 'controller.societe-manager',
    onSelectedSocieteChange: function (societeRecord)
    {

        if (societeRecord !== null)
        {
            this.showSocieteDetail(societeRecord);

        }
    },
    hideSocieteDetail: function ()
    {
        var pnlSocieteDetail = this.lookupReference('pnlSocieteDetail');
        pnlSocieteDetail.collapse();
        pnlSocieteDetail.hide();

    },
    showSocieteDetail: function (fonctionRecord)
    {
        var pnlSocieteDetail = this.lookupReference('pnlSocieteDetail');
        var ctlSocieteDetail = this.lookupReference('ctlSocieteDetail');
        ctlSocieteDetail.setRecord(fonctionRecord);
        pnlSocieteDetail.show();
        pnlSocieteDetail.expand();
    },
    onAddSocieteClick: function ()
    {
        this.editSociete(Ext.create('AmsDomainPrf.model.PrfSte'),true);
       
    },
    onSocieteDoubleClick : function(record)
    {
        this.editSociete(record,false);
    },
    editSociete : function(record,isForInsert)
    {
        var me = this;
       var title = AmsLocale.util.Locale.txtEditSociete;
       if (isForInsert === true)
       {
           title =AmsLocale.util.Locale.txtNewSociete;
       }
        var window = Ext.create('Ext.window.Window', {
            title: title,
            modal: true,
            iconCls:'icon-factory',
            layout: 'fit',
            items: {
                xtype: 'ams-societe-detail',
                readOnly: false,
                record: record,
                listeners: {
                    okClick: function (record)
                    {
                         window.mask(AmsLocale.util.Locale.txtMajDonnees);
                        var societeStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Societe');

                        record.save({
                            callback: function (recordSaved, operation) {
                                if (operation.wasSuccessful()) {
                                    societeStore.load({
                                        callback: function ()
                                        {
                                            window.unmask();
                                            window.close();
                                            me.showSocieteDetail(record);
                                            AmsAdmin.getApplication().fireEvent('societeEdited');

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
    onEditSocieteClick: function ()
    {
        var ctlSocieteDetail = this.lookupReference('ctlSocieteDetail');
        var record = ctlSocieteDetail.getRecord();
        this.editSociete(record,false);
    },
    onDeleteSocieteClick: function ()
    {
        var me = this;
        var societeList = this.lookupReference('societeList');
        var gridSociete = societeList.getController().lookupReference('gridSociete');
        var ctlSocieteDetail = this.lookupReference('ctlSocieteDetail');
        var record = ctlSocieteDetail.getRecord();
        var societeStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Societe');
        var lib = record.get('lib');


        Ext.Msg.show({
            title: AmsLocale.util.Locale.txtConfirmDelete,
            message:Ext.util.Format.format(AmsLocale.util.Locale.questionDeleteSociete, lib),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    societeStore.remove(record);
                    societeStore.sync({
                        success: function ()
                        {
                            gridSociete.getSelectionModel().deselectAll();
                            me.hideSocieteDetail();
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
