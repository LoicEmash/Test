Ext.define('AmsAdmin.view.profil.ManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profil-manager',
    requires: [
        'AmsData.util.Model',
        'AmsLocale.util.Locale'
    ],
    onSelectedProfilChange: function (profilRecord)
    {

        if (profilRecord !== null)
        {
            this.showProfilDetail(profilRecord);
        }
    },
    hideProfilDetail: function ()
    {
        var pnlProfilDetail = this.lookupReference('pnlProfilDetail');
        pnlProfilDetail.collapse();
        pnlProfilDetail.hide();

    },
    showProfilDetail: function (profilRecord)
    {
        var pnlProfilDetail = this.lookupReference('pnlProfilDetail');
        var ctlProfilDetail = this.lookupReference('ctlProfilDetail');
        ctlProfilDetail.setRecord(profilRecord);
        pnlProfilDetail.show();
        pnlProfilDetail.expand();
        console.log("showProfilDetail");
    },
    onAddProfilClick: function ()
    {
        var profil = Ext.create('AmsDomainPrf.model.PrfProf');
        profil.set('genre', 2);
        this.editProfil(profil, true);

    },
    editProfil: function (record, isForInsert)
    {
        var me = this;
        var profilList = this.lookupReference('profilList');
        var gridProfil = profilList.getController().lookupReference('gridProfil');


        var profilGenre = record.get('genre');
        var title = AmsLocale.util.Locale.txtEditProfil;
        if (isForInsert === true)
        {
            title = AmsLocale.util.Locale.txtNewProfil;
        }
        var canEditTable = false;
        var canEditFonction = false;
        if (profilGenre === 2 && isForInsert === false)
        {
            canEditTable = true;
            canEditFonction = true;
        }
        var profilStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Profil');
        var window = Ext.create('Ext.window.Window', {
            modal: true,
            title: title,
            layout: 'fit',
            iconCls: 'icon-profil',
            items: {
                xtype: 'ams-profil-detail',
                canEditTableRight: canEditTable,
                canEditFonctionRight: canEditFonction,
                canEditSchema: isForInsert,
                readOnly: false,
                reference: 'profilDetail',
                record: record,
                listeners: {
                    okClick: function (record)
                    {
                        window.mask(AmsLocale.util.Locale.txtMajDonnees);
                        record.save({
                            callback: function (recordSaved, operation) {

                                if (operation.wasSuccessful()) {

                                    me.updateProfil.call(me, recordSaved, window, canEditTable, canEditFonction, function () {
                                        profilStore.load({
                                            callback: function ()
                                            {
                                                window.unmask();
                                                window.close();
                                                gridProfil.getSelectionModel().select([recordSaved]);
                                            }
                                        });
                                    }, function () {
                                        window.unmask();
                                        Ext.Msg.alert(AmsLocale.util.Locale.txtErreur, AmsLocale.util.Locale.txtDbErreur);
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
    onProfilDoubleClick: function (record)
    {
        this.editProfil(record, false);
    },
    onEditProfilClick: function ()
    {
        var ctlProfilDetail = this.lookupReference('ctlProfilDetail');
        var record = ctlProfilDetail.getRecord();
        this.editProfil(record, false);
    },
    updateProfil: function (recordProfil, window, canEditTable, canEditFonction, successCallback, failureCallback)
    {
        var me = this;
        var profilDetail = window.items.getAt(0);
        var stores = [];
        if (canEditTable === true)
        {
            var gridTable = profilDetail.getController().lookupReference('gridTable');
            var profilTableStore = Ext.data.StoreManager.lookup('AmsAdmin.store.ProfilTable');
            profilTableStore.clearFilter();
            var recordToRemoves = [];
            var profilId = recordProfil.get('id');
            profilTableStore.each(function (item) {
                var itemProfilId = item.get('prfProfId');
                if (itemProfilId === profilId)
                {
                    recordToRemoves.push(item);
                }
            });
            for (var i = 0; i < recordToRemoves.length; i++)
            {
                profilTableStore.remove(recordToRemoves[i]);
            }


            gridTable.getStore().each(function (item) {
                if (item.get('canShow') === true || item.get('canWrite') === true || item.get('canImport') === true)
                {
                    var record = Ext.create('AmsDomainPrf.model.PrfTablDroi');
                    record.set('prfTablId', item.get('tableId'));
                    record.set('prfProfId', recordProfil.get('id'));
                    record.set('show', item.get('canShow'));
                    record.set('import', item.get('canImport'));
                    record.set('write', item.get('canWrite'));
                    profilTableStore.add(record);
                }
            });
            stores.push(profilTableStore);
        }

        if (canEditFonction === true)
        {
            var gridFeature = profilDetail.getController().lookupReference('gridFeature');
            var profilFeatureStore = Ext.data.StoreManager.lookup('AmsAdmin.store.ProfilFeature');
            profilFeatureStore.clearFilter();
            var recordToRemoves = [];
            var profilId = recordProfil.get('id');
            profilFeatureStore.each(function (item) {
                var itemProfilId = item.get('prfProfId');
                if (itemProfilId === profilId)
                {
                    recordToRemoves.push(item);
                }
            });
            for (var i = 0; i < recordToRemoves.length; i++)
            {
                profilFeatureStore.remove(recordToRemoves[i]);
            }
            gridFeature.getStore().each(function (item) {
                if (item.get('canExec') === true)
                {
                    var record = Ext.create('AmsDomainPrf.model.PrfFctDroi');
                    record.set('prfFctId', item.get('featureId'));
                    record.set('prfProfId', recordProfil.get('id'));
                    record.set('exec', item.get('canExec'));
                    profilFeatureStore.add(record);
                }
            });
            stores.push(profilFeatureStore);
        }


        if (stores.length > 0)
        {
            AmsData.util.Model.chainSync(stores, successCallback, failureCallback, me);
        }
        else
        {
            successCallback();
        }




    },
    onDeleteProfilClick: function ()
    {
        var me = this;
        var profilList = this.lookupReference('profilList');
        var gridProfil = profilList.getController().lookupReference('gridProfil');
        var ctlProfilDetail = this.lookupReference('ctlProfilDetail');
        var record = ctlProfilDetail.getRecord();
        var profilStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Profil');
        var lib = record.get('lib');
        var genre = record.get('genre');
        if (genre === 0 || genre === 1)
        { Ext.Msg.alert(AmsLocale.util.Locale.txtOperationInterdite, AmsLocale.util.Locale.txtSupressionProfilSystemeInterdit);}
        else
        {
            Ext.Msg.show({
                title: AmsLocale.util.Locale.txtConfirmDelete,
                message:  Ext.util.Format.format(AmsLocale.util.Locale.questionDeleteProfil,lib),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        profilStore.remove(record);
                        profilStore.sync({
                            success: function ()
                            {
                                gridProfil.getSelectionModel().deselectAll();
                                me.hideProfilDetail();
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
    }
});
