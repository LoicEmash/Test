Ext.define('AmsAdmin.view.profil.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profil-detail',
    init: function ()
    {
        this.fillTableRight();
        this.fillFunctionRight();
    },
    fillFunctionRight: function ()
    {
        
        var profilRecord = this.getView().getRecord();
        var fonctionStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Feature');
        var profilFeatures = [];
        var profilFeatureStore = Ext.data.StoreManager.lookup('AmsAdmin.store.ProfilFeature');
       
        fonctionStore.each(function (item) {
            var schemaIdFct = item.get('prfSchId');
            var schemaIdProfil = profilRecord.get('prfSchId');            
            if (schemaIdFct === schemaIdProfil)
            {
               
                var profilFeature = Ext.create('AmsAdmin.model.ProfilFeature');
                profilFeatureStore.clearFilter(true);
                profilFeatureStore.addFilter({
                    property: 'prfFctId',
                    value: item.get('id')
                });
                profilFeatureStore.addFilter({
                    property: 'prfProfId',
                    value: profilRecord.get('id')
                });
                var canExecute = false;
               
                if (profilFeatureStore.getCount() === 1)
                {
                    var profilFeatureInfo= profilFeatureStore.getAt(0);
                    canExecute = profilFeatureInfo.get('exec');
                    
                }
                profilFeature.set('featureName', item.get('lib'));
                profilFeature.set('featureId', item.get('id'));
                profilFeature.set('canExec', canExecute);               
                profilFeatures.push(profilFeature);
            }
        });
        var featureStore = Ext.create('Ext.data.Store', {
            fields: ['featureName', 'featureId', 'canExec'],
            data: {
                'items': profilFeatures
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'items'
                }
            }
        });

        var gridFeature = this.lookupReference('gridFeature');
        if (gridFeature !== null)
        {
            gridFeature.reconfigure(featureStore);
        }

    },
    fillTableRight: function ()
    {
        var profilRecord = this.getView().getRecord();
        var tableStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Table');
        var profilTables = [];
        var profilTableStore = Ext.data.StoreManager.lookup('AmsAdmin.store.ProfilTable');

        tableStore.each(function (item) {
            if (item.get('prfSchId') === profilRecord.get('prfSchId'))
            {
                var profilTable = Ext.create('AmsAdmin.model.ProfilTable');
                profilTableStore.clearFilter(true);
                profilTableStore.addFilter({
                    property: 'prfTablId',
                    value: item.get('id')
                });
                profilTableStore.addFilter({
                    property: 'prfProfId',
                    value: profilRecord.get('id')
                });
                var canShow = false;
                var canWrite = false;
                var canImport = false;
                if (profilTableStore.getCount() === 1)
                {
                    var profilTableInfo= profilTableStore.getAt(0);
                    canShow = profilTableInfo.get('show');
                    canImport = profilTableInfo.get('import');
                    canWrite = profilTableInfo.get('write');
                }
                profilTable.set('tableId', item.get('id'));
                profilTable.set('tableName', item.get('code'));
                profilTable.set('displayName', item.get('lib'));
                profilTable.set('canShow', canShow);
                profilTable.set('canWrite', canWrite);
                profilTable.set('canImport', canImport);
                profilTables.push(profilTable);
            }
        });
        var profilTableStore = Ext.create('Ext.data.Store', {
            fields: ['tableId', 'tableName', 'displayName', 'canShow', 'canWrite', 'canImport'],
            data: {
                'items': profilTables
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'items'
                }
            }
        });

        var gridTable = this.lookupReference('gridTable');
        if (gridTable !== null)
        {
            gridTable.reconfigure(profilTableStore);
        }

    },
    setRecord: function (profilRecord)
    {

        if (this.getViewModel() !== undefined && this.getViewModel() !== null)
        {
            var viewModel = this.getViewModel();
            viewModel.setRecord(profilRecord);
        }
        if (this.getView() !== null)
        {
            this.fillTableRight();
           this.fillFunctionRight();
        }
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
            viewModel.fillRecord(record);
            this.fireViewEvent('okClick', record);
        }

    }
});
