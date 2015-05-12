// @charset UTF8
// @Todo Faire une minuterie qui sauve les paramètres toutes les 3 secondes si il y as un changement dans le store ou aun atre moyen
Ext.define('AmsUi.util.Param', {
    requires: [
        'AmsDomainPrf.model.PrfUsrParam'
    ],
    singleton: true,
    paramStore: null,
    deferedSync: false,
    isSyncRunning: false,
    loadParams: function (callback)
    {
        if (AmsUi.util.Param.paramStore === null)
        {
            AmsUi.util.Param.paramStore = Ext.create('Ext.data.Store', {
                model: 'AmsDomainPrf.model.PrfUsrParam',
                autoSync: false,
                batchActions: true,
                batchOrder: 'destroy,create,update',
                proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
                    schema: 'Prf',
                    table: 'PrfUsrParam',
                    useLimit: false
                })
            });
        }
        AmsUi.util.Param.paramStore.clearFilter(true);
        AmsUi.util.Param.paramStore.addFilter({
            property: 'login',
            value: AmsAuth.util.Authentification.userLogin
        }, true);
        AmsUi.util.Param.paramStore.load({
            callback: callback
        });
    },
    getParam: function (schema, code, defaultValue)
    {
        var value = defaultValue;
        AmsUi.util.Param.paramStore.each(function (item) {
            if (item.get("sch") === schema && item.get('code') === code)
            {
                value = item.get('val');
            }
        });
        return value;
    },
    setParams: function (params, callback)
    {
        for (var i = 0; i < params.length; i++)
        {
            console.log('set param item ' + params[i].code + " : " + params[i].value);
            AmsUi.util.Param.setParam(params[i].schema, params[i].code, params[i].value, false);
        }
        if (callback !== undefined)
        {
            if ( AmsUi.util.Param.paramStore === null)
            {
                callback();
                return;
            }
            console.log('setParams  AmsUi.util.Param.paramStore.sync , is dirty ' + AmsUi.util.Param.paramStore.isDirty());
            AmsUi.util.Param.isSyncRunning = true;
            AmsUi.util.Param.paramStore.sync({
                callback: function ()
                {
                    if (AmsUi.util.Param.deferedSync === true)
                    {
                        AmsUi.util.Param.paramStore.sync({
                            callback: function ()
                            {
                                AmsUi.util.Param.isSyncRunning = false;
                                AmsUi.util.Param.deferedSync = false;
                                callback();
                            }
                        });
                    }
                    else
                    {
                        AmsUi.util.Param.isSyncRunning = false;
                        callback();
                    }

                }
            });
        }
        else
        {

            AmsUi.util.Param.isSyncRunning = true;
            AmsUi.util.Param.paramStore.sync({
                callback: function ()
                {
                    if (AmsUi.util.Param.deferedSync === true)
                    {
                        AmsUi.util.Param.paramStore.sync({
                            callback: function ()
                            {
                                AmsUi.util.Param.isSyncRunning = false;
                                AmsUi.util.Param.deferedSync = false;
                                callback();
                            }
                        });
                    }
                    else
                    {
                        AmsUi.util.Param.isSyncRunning = false;

                    }

                }
            });
        }

    },
    setParam: function (schema, code, value, autoSync, callback)
    {
        var param = null;
        if (autoSync === undefined)
        {
            autoSync = true;
        }
        //autoSync = true;
        if (AmsUi.util.Param.paramStore !== null)
        {
            AmsUi.util.Param.paramStore.each(function (item) {
                if (item.get("sch") === schema && item.get('code') === code)
                {
                    param = item;
                }
            });
            if (param !== null)
            {

                param.set('val', value);
            }
            else
            {

                param = Ext.create('AmsDomainPrf.model.PrfUsrParam');
                param.set('login', AmsAuth.util.Authentification.userLogin);
                param.set('sch', schema);
                param.set('code', code);
                param.set('val', value);
                AmsUi.util.Param.paramStore.add(param);
            }
            if (autoSync)
            {
                if (callback !== undefined)
                {

                    if (AmsUi.util.Param.paramStore.isDirty() === true)
                    {
                        if (AmsUi.util.Param.isSyncRunning === false)
                        {
                            AmsUi.util.Param.isSyncRunning = true;
                            AmsUi.util.Param.paramStore.sync({
                                callback: function ()
                                {
                                    if (AmsUi.util.Param.deferedSync === true)
                                    {
                                        AmsUi.util.Param.paramStore.sync({
                                            callback: function ()
                                            {
                                                AmsUi.util.Param.isSyncRunning = false;
                                                AmsUi.util.Param.deferedSync = false;
                                                callback();
                                            }
                                        });
                                    }
                                    else
                                    {
                                        AmsUi.util.Param.isSyncRunning = false;
                                        callback();
                                    }

                                }
                            });
                        }

                    }
                    else
                    {
                        callback();
                    }

                }
                else
                {

                    if (AmsUi.util.Param.paramStore.isDirty() === true)
                    {
                        if (AmsUi.util.Param.isSyncRunning === false)
                        {
                            AmsUi.util.Param.isSyncRunning = true;
                            AmsUi.util.Param.paramStore.sync({
                                callback: function ()
                                {
                                    if (AmsUi.util.Param.deferedSync === true)
                                    {
                                        AmsUi.util.Param.paramStore.sync({
                                            callback: function ()
                                            {
                                                AmsUi.util.Param.isSyncRunning = false;
                                                AmsUi.util.Param.deferedSync = false;
                                                callback();
                                            }
                                        });
                                    }
                                    else
                                    {
                                        AmsUi.util.Param.isSyncRunning = false;

                                    }

                                }
                            });
                        }

                    }

                }


            }
            else
            {
                if (callback !== undefined)
                {
                    callback();
                }
            }
        }
    }
});