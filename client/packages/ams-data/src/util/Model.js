// @charset UTF8
Ext.define('AmsData.util.Model', {
    requires: [
        'AmsData.util.Status',
        'AmsLocale.util.Locale'
    ],
    singleton: true,
    getSchema: function (schemaId)
    {
        if (Ext.data.schema.Schema.instances.hasOwnProperty(schemaId)) {
            return Ext.data.schema.Schema.instances[schemaId];
        }
        return null;
    },
    getSchemas: function ()
    {
        var schemas = [];
        var schemaIds = ['Prf', 'Sig', 'Inf'];

        for (var i = 0; i < schemaIds.length; i++)
        {
            if (Ext.data.schema.Schema.instances.hasOwnProperty(schemaIds[i])) {
                schemas.push(Ext.data.schema.Schema.instances[schemaIds[i]]);
            }

        }
        return schemas;

    },
    chainSync: function (stores, successCallback, failureCallback, scope, storeIndex)
    {

        if (stores.length === 0)
        {
            callback();
            return;
        }
        var index = 0;
        if (storeIndex !== undefined)
        {
            index = storeIndex;
        }
        var store = stores[index];
        if (store.isDirty() === true)
        {
            store.sync({
                success: function ()
                {
                    if (index < (stores.length - 1))
                    {
                        AmsData.util.Model.chainSync(stores, successCallback, failureCallback, scope, index + 1);
                    }
                    else
                    {
                        if (Ext.isFunction(successCallback))
                        {
                            if (scope !== undefined)
                            {
                                successCallback.call(scope);
                            }
                            else
                            {
                                successCallback();
                            }

                        }
                    }
                },
                failure: function ()
                {
                    if (Ext.isFunction(failureCallback))
                    {
                        if (scope !== undefined)
                        {
                            failureCallback.call(scope);
                        }
                        else
                        {
                            failureCallback();
                        }

                    }
                }
            });
        }
        else
        {
            if (index < (stores.length - 1))
            {
                AmsData.util.Model.chainSync(stores, successCallback, failureCallback, index + 1);
            }
            else
            {
                if (Ext.isFunction(successCallback))
                {
                    if (scope !== undefined)
                    {
                        successCallback.call(scope);
                    }
                    else
                    {
                        successCallback();
                    }

                }
            }
        }
    },
    chainSave: function (models, successCallback, failureCallback, scope, modelIndex) {
        if (models === undefined)
        {
            callback();
            return;
        }
        if (models.length === 0)
        {
            callback();
            return;
        }
        var i = 0;
        if (modelIndex !== undefined)
        {
            i = modelIndex;
        }

        var model = models[i];
        model.save({
            callback: function (records, operation) {
                if (operation.wasSuccessful() && records !== null) {
                    if (i < (models.length - 1))
                    {
                        AmsData.util.Model.chainSave(models, successCallback, failureCallback, scope, i + 1);
                    }
                    else
                    {
                        if (Ext.isFunction(successCallback))
                        {
                            if (scope !== undefined)
                            {
                                successCallback.call(scope);
                            }
                            else
                            {
                                successCallback();
                            }
                        }
                    }
                }
                else
                {
                    if (Ext.isFunction(failureCallback))
                    {
                        if (scope !== undefined)
                        {
                            failureCallback.call(scope);
                        }
                        else
                        {
                            failureCallback();
                        }
                    }
                }
            }
        });
    },
    chainErase: function (models, successCallback, failureCallback, scope, modelIndex) {
        if (models === undefined)
        {
            callback();
            return;
        }
        if (models.length === 0)
        {
            callback();
            return;
        }
        var i = 0;
        if (modelIndex !== undefined)
        {
            i = modelIndex;
        }
        var model = models[i];
        model.erase({
            callback: function (records, operation) {
                if (operation.wasSuccessful() && records !== null) {
                    if (i < (models.length - 1))
                    {
                        AmsData.util.Model.chainErase(models, successCallback, failureCallback, scope, i + 1);
                    }
                    else
                    {
                        if (Ext.isFunction(successCallback))
                        {
                            if (scope !== undefined)
                            {
                                successCallback.call(scope);
                            }
                            else
                            {
                                successCallback();
                            }
                        }
                    }
                }
                else
                {
                    if (Ext.isFunction(failureCallback))
                    {
                        if (scope !== undefined)
                        {
                            failureCallback.call(scope);
                        }
                        else
                        {
                            failureCallback();
                        }
                    }
                }
            }
        });
    },
    chainLoad: function (stores, successCallback, failureCallback, scope, storeIndex) {

        if (stores === undefined)
        {
            callback();
            return;
        }
        if (stores.length === 0)
        {
            callback();
            return;
        }
        var i = 0;
        if (storeIndex !== undefined)
        {
            i = storeIndex;
        }

        var store = stores[i];

        var model = store.getProxy().getModel();
        if (model !== null)
        {
            var modelInstance = model.create();
            if (modelInstance !== null && modelInstance.tableDisplayName !== undefined)
            {
                AmsData.util.Status.setText(AmsLocale.util.Locale.txtChargement + ' ' + modelInstance.tableDisplayName);
            }
        }
        if (stores.length > 0)
        {
            AmsData.util.Status.setProgress((i / stores.length) * 100);
        }


        store.load({
            callback: function (records, operation) {
                if (operation.wasSuccessful() && records !== null)
                {
                    if (i < (stores.length - 1))
                    {
                        AmsData.util.Model.chainLoad(stores, successCallback, failureCallback, scope, i + 1);
                    }
                    else
                    {
                        if (Ext.isFunction(successCallback))
                        {
                            if (scope !== undefined)
                            {
                                AmsData.util.Status.clear();
                                successCallback.call(scope);
                            }
                            else
                            {
                                AmsData.util.Status.clear();
                                successCallback();
                            }
                        }
                    }
                }
                else
                {
                    if (Ext.isFunction(failureCallback))
                    {
                        if (scope !== undefined)
                        {
                            AmsData.util.Status.clear();
                            failureCallback.call(scope);
                        }
                        else
                        {
                            AmsData.util.Status.clear();
                            failureCallback();
                        }
                    }
                }
            }
        });
    }
});


