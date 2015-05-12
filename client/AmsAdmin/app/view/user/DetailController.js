Ext.define('AmsAdmin.view.user.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-detail',
    requires: [
        'AmsAdmin.model.UserProfil'
    ],
    init: function ()
    {
        this.fillProfil();

    },
    fillProfil: function ()
    {
       
        var userRecord = this.getView().getRecord();
        var schemaStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Schema');
        var gridUserProfil = this.lookupReference('gridUserProfil');
        var readOnly = this.getView().getReadOnly();
        if (gridUserProfil !== null)
        {
           
            gridUserProfil.removeAll();
        }
        var userProfilStore = Ext.data.StoreManager.lookup('AmsAdmin.store.UserProfil');
        var profilStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Profil');
        schemaStore.each(function (item) {
            var schemaId = item.get('id');
            var schemaProfilId = null;
            userProfilStore.each(function (itemUserProfil) {
                if (itemUserProfil.get('prfUserId') === userRecord.get('id'))
                {
                    var profilRecord = profilStore.findRecord('id', itemUserProfil.get('prfProfId'));
                    if (profilRecord !== null)
                    {
                        var profilSchemaId = profilRecord.get('prfSchId');
                        if (profilSchemaId === schemaId)
                        {
                            schemaProfilId = profilRecord.get('id');
                        }
                    }
                }


            });
            if (schemaProfilId === null)
            {
                profilStore.each(function (itemProfil) {
                    if (itemProfil.get('prfSchId') === schemaId && itemProfil.get('genre') === 0)
                    {
                        schemaProfilId = itemProfil.get('id');
                    }
                });
            }



            if (gridUserProfil !== null)
            {

                var combo = Ext.create('Ext.form.field.ComboBox', {
                    fieldLabel: item.get('lib'),
                    margin: 4,                  
                    queryMode: 'local',
                    displayField: 'lib',
                    valueField: 'id',
                    editable:false,
                    readOnly:readOnly,                   
                    store: Ext.create('Ext.data.ChainedStore', {
                        source: profilStore,
                        filters: [
                            {
                                property: 'prfSchId',
                                value: schemaId
                            }
                        ]
                    }),
                    value:schemaProfilId

                });
                gridUserProfil.add(combo);

            }


        });


    },
    setRecord: function (userRecord)
    {

        if (this.getViewModel() !== undefined && this.getViewModel() !== null)
        {
            var viewModel = this.getViewModel();
            viewModel.setRecord(userRecord);
        }
        if (this.getView() !== null)
        {
            this.fillProfil();

        }
    },
    onComboSocieteChange: function (combo, newValue, oldValue, eOpts)
    {
        var comboService = this.lookupReference('comboService');
        var comboFonction = this.lookupReference('comboFonction');
        comboService.getStore().clearFilter(true);
        comboService.clearValue();
        comboFonction.clearValue();
        comboService.getStore().addFilter({
            property: 'prfSteId',
            value: newValue
        });



    },
    onComboServiceChange: function (combo, newValue, oldValue, eOpts)
    {
        var comboFonction = this.lookupReference('comboFonction');
        comboFonction.getStore().clearFilter(true);
        comboFonction.clearValue();
        comboFonction.getStore().addFilter({
            property: 'prfSvcId',
            value: newValue
        });
    },
    onCancelClick: function ()
    {
        var record = this.getView().getRecord();
        this.fireViewEvent('cancelClick', record);
    },
    onOkClick: function ()
    {
        if (this.getViewModel() !== undefined && this.getViewModel() !== null)
        {
            var viewModel = this.getViewModel();
            var record = this.getView().getRecord();
            if (this.getView().getCanEditPassword() === true)
            {
                viewModel.fillRecord(record, true);
            }
            else
            {
                viewModel.fillRecord(record, false);
            }

            this.fireViewEvent('okClick', record);
        }

    }

});
