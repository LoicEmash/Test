// @charset UTF8
Ext.define('AmsData.data.proxy.SecureRestProxy', {
    // requires: ['AmsAuth.util.Authentification'],
    extend: 'Ext.data.proxy.Rest',
    pageParam: false,
    startParam: false,
    limitParam: false,
    appendId: false,
    pageSize: 100,
    config: {
        schema: null,
        table: null,
        useLimit: false,
        // Table enfants dont les données doivent être ramené (on gère un seul niveau pour l'instant) séparé par des pipe
        needestChildTables: null,
        // Table parent dont les données doivent être ramené (on gère un seul niveau pour l'instant) séparé par des pipe
        needestParentTables: null
    },
    setNeedestChildTables: function(tables) {
        this.needestChildTables = tables;
        this.extraParams = {
            needestChildTables: this.getNeedestChildTables(),
            needestParentTables: this.getNeedestParentTables()
        };
    },
    setNeedestParentTables: function(tables) {
        this.needestParentTables = tables;
        this.extraParams = {
            needestChildTables: this.getNeedestChildTables(),
            needestParentTables: this.getNeedestParentTables()
        };
    },
    url: '../../serveur/web/app_dev.php/Data',
    constructor: function(config) {
        this.callParent(arguments);
        // Other initialization needed when this class is instantiated or subclassed
        this.setUrl('../../serveur/web/app_dev.php/Data/' + config.schema + '/' + config.table);
        if (config.useLimit === undefined) {
            config.useLimit = false;
        } else if (config.useLimit === true) {
            this.setPageParam('page');
            this.setStartParam('start');
            this.setLimitParam('limit');
        } else {
            this.setPageParam(false);
            this.setStartParam(false);
            this.setLimitParam(false);
        }
    },
    buildUrl: function() {
        var url = this.callParent(arguments);
        return url + '&apiKey=' + AmsAuth.util.Authentification.apiKey;
    },
    reader: {
        type: 'json',
        rootProperty: 'datas',
        dateFormat: 'd/m/Y H:i:s',
        messageProperty: 'message',
        successProperty: 'success',
        totalProperty: 'total'
    },
    writer: {
        type: 'json',
        dateFormat: 'd/m/Y H:i:s',
        writeAllFields: false
    }
});
Ext.define(null, {
    override: "Ext.data.Store",
    isDirty: function() {
        return (this.getNewRecords().length > 0 || this.getUpdatedRecords().length > 0 || this.getRemovedRecords().length > 0);
    }
});

// @charset UTF8
Ext.define('AmsData.util.Status', {
    singleton: true,
    globalProgressBarCmpId: 'global-progressbar',
    requires: [
        'AmsLocale.util.Locale'
    ],
    setText: function(statusText) {
        var globalProgressBar = Ext.getCmp(AmsData.util.Status.globalProgressBarCmpId);
        globalProgressBar.updateText(statusText);
    },
    clear: function() {
        var globalProgressBar = Ext.getCmp(AmsData.util.Status.globalProgressBarCmpId);
        globalProgressBar.updateText(AmsLocale.util.Locale.txtPret);
        globalProgressBar.updateProgress(0);
    },
    setProgress: function(percent) {
        var globalProgressBar = Ext.getCmp(AmsData.util.Status.globalProgressBarCmpId);
        globalProgressBar.updateProgress(percent / 100);
    }
});
//updateProgress

// @charset UTF8
Ext.define('AmsData.util.Model', {
    requires: [
        'AmsData.util.Status',
        'AmsLocale.util.Locale'
    ],
    singleton: true,
    chainSync: function(stores, successCallback, failureCallback, scope, storeIndex) {
        if (stores.length === 0) {
            callback();
            return;
        }
        var index = 0;
        if (storeIndex !== undefined) {
            index = storeIndex;
        }
        var store = stores[index];
        if (store.isDirty() === true) {
            store.sync({
                success: function() {
                    if (index < (stores.length - 1)) {
                        AmsData.util.Model.chainSync(stores, successCallback, failureCallback, scope, index + 1);
                    } else {
                        if (Ext.isFunction(successCallback)) {
                            if (scope !== undefined) {
                                successCallback.call(scope);
                            } else {
                                successCallback();
                            }
                        }
                    }
                },
                failure: function() {
                    if (Ext.isFunction(failureCallback)) {
                        if (scope !== undefined) {
                            failureCallback.call(scope);
                        } else {
                            failureCallback();
                        }
                    }
                }
            });
        } else {
            if (index < (stores.length - 1)) {
                AmsData.util.Model.chainSync(stores, successCallback, failureCallback, index + 1);
            } else {
                if (Ext.isFunction(successCallback)) {
                    if (scope !== undefined) {
                        successCallback.call(scope);
                    } else {
                        successCallback();
                    }
                }
            }
        }
    },
    chainSave: function(models, successCallback, failureCallback, scope, modelIndex) {
        if (models === undefined) {
            callback();
            return;
        }
        if (models.length === 0) {
            callback();
            return;
        }
        var i = 0;
        if (modelIndex !== undefined) {
            i = modelIndex;
        }
        var model = models[i];
        model.save({
            callback: function(records, operation) {
                if (operation.wasSuccessful() && records !== null) {
                    if (i < (models.length - 1)) {
                        AmsData.util.Model.chainSave(models, successCallback, failureCallback, scope, i + 1);
                    } else {
                        if (Ext.isFunction(successCallback)) {
                            if (scope !== undefined) {
                                successCallback.call(scope);
                            } else {
                                successCallback();
                            }
                        }
                    }
                } else {
                    if (Ext.isFunction(failureCallback)) {
                        if (scope !== undefined) {
                            failureCallback.call(scope);
                        } else {
                            failureCallback();
                        }
                    }
                }
            }
        });
    },
    chainErase: function(models, successCallback, failureCallback, scope, modelIndex) {
        if (models === undefined) {
            callback();
            return;
        }
        if (models.length === 0) {
            callback();
            return;
        }
        var i = 0;
        if (modelIndex !== undefined) {
            i = modelIndex;
        }
        var model = models[i];
        model.erase({
            callback: function(records, operation) {
                if (operation.wasSuccessful() && records !== null) {
                    if (i < (models.length - 1)) {
                        AmsData.util.Model.chainErase(models, successCallback, failureCallback, scope, i + 1);
                    } else {
                        if (Ext.isFunction(successCallback)) {
                            if (scope !== undefined) {
                                successCallback.call(scope);
                            } else {
                                successCallback();
                            }
                        }
                    }
                } else {
                    if (Ext.isFunction(failureCallback)) {
                        if (scope !== undefined) {
                            failureCallback.call(scope);
                        } else {
                            failureCallback();
                        }
                    }
                }
            }
        });
    },
    chainLoad: function(stores, successCallback, failureCallback, scope, storeIndex) {
        if (stores === undefined) {
            callback();
            return;
        }
        if (stores.length === 0) {
            callback();
            return;
        }
        var i = 0;
        if (storeIndex !== undefined) {
            i = storeIndex;
        }
        var store = stores[i];
        var model = store.getProxy().getModel();
        if (model !== null) {
            var modelInstance = model.create();
            if (modelInstance !== null && modelInstance.tableDisplayName !== undefined) {
                AmsData.util.Status.setText(AmsLocale.util.Locale.txtChargement + ' ' + modelInstance.tableDisplayName);
            }
        }
        if (stores.length > 0) {
            AmsData.util.Status.setProgress((i / stores.length) * 100);
        }
        store.load({
            callback: function(records, operation) {
                if (operation.wasSuccessful() && records !== null) {
                    if (i < (stores.length - 1)) {
                        AmsData.util.Model.chainLoad(stores, successCallback, failureCallback, scope, i + 1);
                    } else {
                        if (Ext.isFunction(successCallback)) {
                            if (scope !== undefined) {
                                AmsData.util.Status.clear();
                                successCallback.call(scope);
                            } else {
                                AmsData.util.Status.clear();
                                successCallback();
                            }
                        }
                    }
                } else {
                    if (Ext.isFunction(failureCallback)) {
                        if (scope !== undefined) {
                            AmsData.util.Status.clear();
                            failureCallback.call(scope);
                        } else {
                            AmsData.util.Status.clear();
                            failureCallback();
                        }
                    }
                }
            }
        });
    }
});

