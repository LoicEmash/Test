// @charset UTF8
Ext.define('AmsUi.util.Generic', {
    singleton: true,
    instanceCount: [],
    referenceStores: [],
    
    getReferenceStore: function (classInfo)
    {
        if (AmsUi.util.Generic.referenceStores[classInfo.entityName] !== undefined)
        {
            return AmsUi.util.Generic.referenceStores[classInfo.entityName];
        }
        else
        {
            var store = Ext.create('Ext.data.Store', {
                model: classInfo.displayName,
                proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
                    schema: classInfo.schema.id,
                    table: classInfo.entityName,
                    useLimit: false
                })});
            AmsUi.util.Generic.referenceStores[classInfo.entityName] = store;
            return AmsUi.util.Generic.referenceStores[classInfo.entityName];
        }
    },
    createTableMetierManager: function (classInfo)
    {
        var instanceId = 1;
        if (AmsUi.util.Generic.instanceCount[classInfo.entityName] !== undefined)
        {
            instanceId = AmsUi.util.Generic.instanceCount[classInfo.entityName] + 1;
            AmsUi.util.Generic.instanceCount[classInfo.entityName] = instanceId;
        }
        else
        {
            AmsUi.util.Generic.instanceCount[classInfo.entityName] = 1;
        }
        var manager = Ext.create('AmsUi.view.generic.Manager', {
            classInfo: classInfo,
            closable: true,
            instanceId: instanceId
        });
        return manager;
    }
});