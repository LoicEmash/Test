Ext.define('AmsAdmin.view.user.ManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-manager',
    requires: [
        'AmsData.util.Model',
        'AmsLocale.util.Locale'
    ],
    onSelectedUserChange: function (userRecord)
    {

        if (userRecord !== null)
        {
            this.showUserDetail(userRecord);

        }
    },
    hideUserDetail: function ()
    {
        var pnlUserDetail = this.lookupReference('pnlUserDetail');
        pnlUserDetail.collapse();
        pnlUserDetail.hide();

    },
    showUserDetail: function (userRecord)
    {
        var pnlUserDetail = this.lookupReference('pnlUserDetail');
        var ctlUserDetail = this.lookupReference('ctlUserDetail');
        ctlUserDetail.setRecord(userRecord);
        pnlUserDetail.show();
        pnlUserDetail.expand();
    },
    updateUserProfil: function (userRecord, window, callback)
    {
        var userProfilStore = Ext.data.StoreManager.lookup('AmsAdmin.store.UserProfil');
        var itemToRemoves = [];
        userProfilStore.each(function (itemUserProfil) {
            if (itemUserProfil.get('prfUserId') === userRecord.get('id'))
            {
                itemToRemoves.push(itemUserProfil);
            }
        });
        for (var i = 0; i < itemToRemoves.length; i++)
        {
            userProfilStore.remove(itemToRemoves[i]);
        }
        var userDetail = window.items.getAt(0);
        var gridUserProfil = userDetail.getController().lookupReference('gridUserProfil');
        gridUserProfil.items.each(function (item) {
            var profilId = item.getValue();
            var record = Ext.create('AmsDomainPrf.model.PrfProfUser');
            record.set('prfProfId', profilId);
            record.set('prfUserId', userRecord.get('id'));
            userProfilStore.add(record);

            //console.log('schema id ' + schemaId + ', profilId' + profilId);
        });
        userProfilStore.sync({
            success: function ()
            {
                callback();
            },
            failure: function ()
            {

            }
        });


    },
    onAddUserClick: function ()
    {
        this.editUser(Ext.create('AmsDomainPrf.model.PrfUser'), true);

    },
    onUserDoubleClick: function (record)
    {
        this.editUser(record, false);
    },
    editUser: function (record, isForInsert)
    {
        var me = this;
        var title = AmsLocale.util.Locale.txtEditUtilisateur;
        if (isForInsert === true)
        {
            title = AmsLocale.util.Locale.txtNewUtilisateur;
        }
        var window = Ext.create('Ext.window.Window', {
            title: title,
            layout: 'fit',
            iconCls: 'icon-user',
            modal: true,
            items: {// Let's put an empty grid in just to illustrate fit layout
                xtype: 'ams-user-detail',
                readOnly: false,
                canEditPassword: false,
                record: record,
                listeners: {
                    okClick: function (record)
                    {
                         window.mask(AmsLocale.util.Locale.txtMajDonnees);
                        var userProfilStore = Ext.data.StoreManager.lookup('AmsAdmin.store.UserProfil');
                        var userStore = Ext.data.StoreManager.lookup('AmsAdmin.store.User');
                        record.save({
                            callback: function (recordSaved, operation) {
                                if (operation.wasSuccessful()) {
                                    me.updateUserProfil.call(me, recordSaved, window, function () {
                                        userStore.load({
                                            callback: function ()
                                            {
                                                userProfilStore.load({
                                                    callback: function ()
                                                    {
                                                        window.unmask();
                                                        me.showUserDetail(record);
                                                        window.close();
                                                    }
                                                });

                                            }
                                        });


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
    onEditUserClick: function ()
    {
        var ctlUserDetail = this.lookupReference('ctlUserDetail');
        var record = ctlUserDetail.getRecord();
        this.editUser(record, false);
    },
    onDeleteUserClick: function ()
    {
        var me = this;
        var userList = this.lookupReference('userList');
        var gridUser = userList.getController().lookupReference('gridUser');
        var ctlUserDetail = this.lookupReference('ctlUserDetail');
        var record = ctlUserDetail.getRecord();
        var userStore = Ext.data.StoreManager.lookup('AmsAdmin.store.User');
        var nom = record.get('prenom');
        var prenom = record.get('nom');

        Ext.Msg.show({
            title: AmsLocale.util.Locale.txtConfirmDelete,
            message: Ext.util.Format.format(AmsLocale.util.Locale.questionDeleteUser, prenom + ' ' + nom),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    userStore.remove(record);
                    userStore.sync({
                        success: function ()
                        {
                            gridUser.getSelectionModel().deselectAll();
                            me.hideUserDetail();
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
