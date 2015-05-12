Ext.define('AmsAdmin.view.fonction.ManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fonction-manager',
    requires:[
        'AmsLocale.util.Locale'
    ],
    onSelectedFonctionChange: function (fonctionRecord)
    {
        if (fonctionRecord !== null)
        {
            this.showFonctionDetail(fonctionRecord);
        }
    },
    hideFonctionDetail: function ()
    {
        var pnlFonctionDetail = this.lookupReference('pnlFonctionDetail');
        pnlFonctionDetail.collapse();
        pnlFonctionDetail.hide();
    },
    showFonctionDetail: function (fonctionRecord)
    {
        var pnlFonctionDetail = this.lookupReference('pnlFonctionDetail');
        var ctlFonctionDetail = this.lookupReference('ctlFonctionDetail');
        ctlFonctionDetail.setRecord(fonctionRecord);
        pnlFonctionDetail.show();
        pnlFonctionDetail.expand();
    },
    onAddFonctionClick: function ()
    {
        this.editFonction(Ext.create('AmsDomainPrf.model.PrfPtfo'),true);        
    },
    
    editFonction: function (recordToEdit,isForInsert)
    {
        var me = this;        
        var title = AmsLocale.util.Locale.txtEditFonction;
        if (isForInsert === true)
        {title = AmsLocale.util.Locale.txtNewFonction;}
        var window = Ext.create('Ext.window.Window', {
            title: title,
            iconCls: 'icon-fonction',
            modal: true,
            layout: 'fit',
            items: {
                xtype: 'ams-fonction-detail',
                readOnly: false,
                record: recordToEdit,
                listeners: {
                    okClick: function (record)
                    {
                        window.mask(AmsLocale.util.Locale.txtMajDonnees);
                        var fonctionStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Fonction');
                        record.save({
                            callback: function (recordSaved, operation) {
                                if (operation.wasSuccessful()) {
                                    fonctionStore.load({
                                        callback: function () {
                                            window.unmask();
                                            window.close();
                                            me.showFonctionDetail(recordSaved);
                                            AmsAdmin.getApplication().fireEvent('fonctionEdited');
                                        }
                                    });

                                } else {
                                    window.unmask();
                                    Ext.Msg.alert( AmsLocale.util.Locale.txtErreur,  AmsLocale.util.Locale.txtDbErreur);
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
    onFonctionDoubleClick: function (record)
    {
        this.editFonction(record,false);
    },
    onEditFonctionClick: function ()
    {
        var ctlFonctionDetail = this.lookupReference('ctlFonctionDetail');
        var record = ctlFonctionDetail.getRecord();
        this.editFonction(record,false);
    },
    onDeleteFonctionClick: function ()
    {
        var me = this;
        var fonctionList = this.lookupReference('fonctionList');
        var gridFonction = fonctionList.getController().lookupReference('gridFonction');
        var ctlFonctionDetail = this.lookupReference('ctlFonctionDetail');
        var record = ctlFonctionDetail.getRecord();
        var fonctionStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Fonction');
        var lib = record.get('lib');


        Ext.Msg.show({
            title:  AmsLocale.util.Locale.txtConfirmDelete,
            //var urlExt = 
            message: Ext.util.Format.format(AmsLocale.util.Locale.questionDeleteFonction,lib),
            //'Etes-vous sur de vouloir supprimer la fonction ' + lib + ' ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    fonctionStore.remove(record);
                    fonctionStore.sync({
                        success: function ()
                        {
                            gridFonction.getSelectionModel().deselectAll();
                            me.hideFonctionDetail();
                        },
                        failure : function()
                        {
                            Ext.Msg.alert(AmsLocale.util.Locale.txtErreur,  AmsLocale.util.Locale.txtDbErreur);
                        }
                    });
                }
            }
        });

    }
});
