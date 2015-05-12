Ext.define('AmsUi.view.generic.ManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.generic-manager',
    referenceStores: [],
    isSearchMode: true,
    onItemDoubleClick: function (grid, record, item, index, e, eOpts)
    {
        var classInfo = this.getView().getClassInfo();
        if (record !== null)
        {

            AmsUi.util.EditRecordService.editRecord("Modification", 'ams-generic-detail', record, grid.getStore(), function () {
            }, function () {
            }, classInfo);
        }
    },
    recurseCreateReferenceColumns: function (field, targetField, stores)
    {
        var columns = [];
        var comboRender = function (params) {
            return function (value) {
                if (params.stores !== undefined && params.stores !== null)
                {
                    if (params.stores.length > 0)
                    {
                        var baseStore = params.stores[0];
                        var record = baseStore.findRecord('id', value);
                        for (var i = 1; i < params.stores.length; i++)
                        {
                            if (record === null)
                            {
                                break;
                            }
                            var store = params.stores[i];
                            var entityName = store.model.entityName;
                            var refIdfieldName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + 'Id';
                            var refId = record.get(refIdfieldName);
                            record = store.findRecord('id', refId);
                        }
                        if (record === null)
                        {
                            return "";
                        }
                        else
                        {
                            return record.get('lib');
                        }
                    }
                    else
                    {
                        return '';
                    }


                }
                else
                {
                    return '';
                }

            };
        };
        var referenceStore = AmsUi.util.Generic.getReferenceStore(targetField.reference.cls);
        if (this.isStoreReferenced(referenceStore) === false)
        {
            this.referenceStores.push(referenceStore);

            for (var i = 0; i < referenceStore.model.getFields().length; i++)
            {
                var fieldRef = referenceStore.model.getFields()[i];
                if (fieldRef.reference !== undefined && fieldRef.reference !== null)
                {
                    columns = columns.concat(this.recurseCreateReferenceColumns(field, fieldRef, stores.concat([referenceStore])));
                }
            }
            columns.push({
                text: targetField.displayName,
                flex: 1,
                dataIndex: field.getName(),
                renderer: comboRender({stores: stores.concat([referenceStore])})
            });
        }



        return columns;

    },
    isStoreReferenced: function (store)
    {
        var referenced = false;
        for (var i = 0; i < this.referenceStores.length; i++)
        {
            if (store.model.entityName === this.referenceStores[i].model.entityName)
            {
                referenced = true;
            }
        }
        return referenced;
    },
    updateButtonsStates: function ()
    {
        var genericDetail = this.lookupReference('genericDetail');
        var genericSearch = this.lookupReference('genericSearch');
        if (this.isSearchMode === true)
        {
            genericDetail.hide();
            genericSearch.show();
        }
        else
        {
            genericDetail.show();
            genericSearch.hide();
        }
        var genericGrid = this.lookupReference('genericGrid');
        var classInfo = this.getView().getClassInfo();
        var allowWrite = AmsAuth.util.Authentification.canWriteTable(classInfo.entityName);
        var btCreate = this.lookupReference('btCreate');
        var btUpdate = this.lookupReference('btUpdate');
        var btDelete = this.lookupReference('btDelete');
        var btClear = this.lookupReference('btClear');
        var btSearch = this.lookupReference('btSearch');
        if (this.isSearchMode === true)
        {
            btClear.disable();
            btSearch.enable();
            if (allowWrite)
            {
                btCreate.enable();
            }
        }
        else
        {
            btClear.enable();
            btSearch.disable();

            if (allowWrite)
            {

                if (genericGrid.getSelectionModel().getSelection().length === 1)
                {
                    btUpdate.enable();
                    btDelete.enable();
                }
                btCreate.enable();

            }
            else
            {
                btCreate.setTooltip('Vous n\'êtes pas autorisé à insérer des données dans cette table');
                btUpdate.setTooltip('Vous n\'êtes pas autorisé à modifier des données de cette table');
                btDelete.setTooltip('Vous n\'êtes pas autorisé à supprimer des données de cette table');
                btCreate.disable();
                btUpdate.disable();
                btDelete.disable();
            }
        }

    },
    onDeleteClick: function ()
    {
        var genericGrid = this.lookupReference('genericGrid');

        if (genericGrid.getSelectionModel().getSelection().length === 1)
        {
            var selection = genericGrid.getSelectionModel().getSelection()[0];
            AmsUi.util.EditRecordService.deleteRecord("Etes-vous sur de vouloir supprimer cette enregistrement ?", selection, genericGrid.getStore(), function () {
                AmsMain.getApplication().fireEvent('dataRemoved');
            });
        }

    },
    onUpdateClick: function ()
    {
        var genericGrid = this.lookupReference('genericGrid');
        var classInfo = this.getView().getClassInfo();
        if (genericGrid.getSelectionModel().getSelection().length === 1)
        {
            var selection = genericGrid.getSelectionModel().getSelection()[0];
            AmsUi.util.EditRecordService.editRecord("Modifier", 'ams-generic-detail', selection, genericGrid.getStore(), function () {
            }, function () {
            }, classInfo);
        }
    },
    onCreateClick: function ()
    {
        var genericGrid = this.lookupReference('genericGrid');
        var classInfo = this.getView().getClassInfo();

        var record = Ext.create(classInfo.displayName);
        AmsUi.util.EditRecordService.editRecord("Nouveau", 'ams-generic-detail', record, genericGrid.getStore(), function () {
        }, function () {
        }, classInfo);

    },
    onClearClick: function ()
    {
        var genericGrid = this.lookupReference('genericGrid');
        genericGrid.getStore().loadData([]);
        this.isSearchMode = true;
        this.updateButtonsStates();
    },
    onSearchClick: function ()
    {
        var me = this;
        var genericGrid = this.lookupReference('genericGrid');
        genericGrid.getStore().load({
            callback: function (records, operation, success)
            {
                if (records.length === 0)
                {
                    Ext.Msg.alert('Aucune données', 'Aucune données à afficher, retour au mode recherche.');
                    me.isSearchMode = true;
                    me.updateButtonsStates.call(me);
                }
                else
                {
                    me.isSearchMode = false;
                    me.updateButtonsStates.call(me);
                    genericGrid.getSelectionModel().select( genericGrid.getStore().getAt(0));
                }
            }
        });

    },
    init: function ()
    {

        var classInfo = this.getView().getClassInfo();
        this.referenceStores = [];
        var columns = [];
        this.getView().setTitle(classInfo.prototype.tableDisplayName + ' #' + this.getView().getInstanceId());

        for (var i = 0; i < classInfo.getFields().length; i++)
        {
            var field = classInfo.getFields()[i];
            var fieldName = field.getName();

            if (fieldName !== 'id')
            {
                if (field.reference !== undefined && field.reference !== null)
                {
                    var hierarchy = this.recurseCreateReferenceColumns(field, field, []);
                    columns = columns.concat(hierarchy);

                }
                else
                {

                    if (field.uiType === 'image')
                    {

                    }
                    else if (field.uiType === 'geom')
                    {

                    }
                    else if (field.getType() === 'string' || field.getType() === 'int')
                    {
                        columns.push({
                            text: field.displayName,
                            flex: 1,
                            dataIndex: fieldName
                        });
                    }
                    else if (field.getType() === 'date')
                    {

                        columns.push({
                            xtype: 'datecolumn',
                            text: field.displayName,
                            flex: 1,
                            dataIndex: fieldName
                        });
                    }
                    else if (field.getType() === 'number')
                    {
                        columns.push({
                            xtype: 'numbercolumn',
                            text: field.displayName,
                            flex: 1,
                            dataIndex: fieldName
                        });
                    }
                    else if (field.getType() === 'boolean' || field.getType() === 'bool')
                    {
                        columns.push({
                            xtype: 'checkcolumn',
                            text: field.displayName,
                            flex: 1,
                            listeners: {beforecheckchange: function () {
                                    return false;
                                }},
                            dataIndex: fieldName
                        });
                    }
                    else
                    {
                        console.log('type non géré ' + field.getType());
                    }


                }
            }
        }
        var genericGrid = this.lookupReference('genericGrid');
        var store = Ext.create('Ext.data.Store', {
            model: classInfo.displayName,
            remoteSort: true,
            remoteFilter: true,
            proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
                schema: classInfo.schema.id,
                table: classInfo.entityName,
                useLimit: true
            })});
        var genericDetailPagingToolbar = this.lookupReference('genericDetailPagingToolbar');
        AmsData.util.Model.chainLoad(this.referenceStores, function () {
            genericGrid.reconfigure(store, columns);
            genericDetailPagingToolbar.setStore(store);
            this.referenceStores = [];
            this.updateButtonsStates();

        }, function () {
        }, this);
    },
    onGridSelectionChange: function (grid, selected)
    {
        var genericDetail = this.lookupReference('genericDetail');
        if (grid !== null && selected !== undefined && selected !== null && selected.length === 1)
        {
            var selectedRecord = selected[0];
            genericDetail.setRecord(selectedRecord);
            genericDetail.expand();

        }
        this.updateButtonsStates();
    }
});
