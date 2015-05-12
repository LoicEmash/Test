// @charset UTF8

Ext.define('AmsData.data.proxy.SecureRestProxy', {
   // requires: ['AmsAuth.util.Authentification'],
    extend: 'Ext.data.proxy.Rest',
    pageParam: false,
    startParam: false,
    limitParam: false,
    appendId:false,
    pageSize: 100,
    config: {
        schema :null,
        table: null,
        useLimit : false,
         // Table enfants dont les données doivent être ramené (on gère un seul niveau pour l'instant) séparé par des pipe
        needestChildTables:null,
        // Table parent dont les données doivent être ramené (on gère un seul niveau pour l'instant) séparé par des pipe
        needestParentTables:null
    },
     setNeedestChildTables : function(tables)
    {
        this.needestChildTables = tables;
        this.extraParams = {
            needestChildTables : this.getNeedestChildTables(),
            needestParentTables: this.getNeedestParentTables()
        };
    },    
    setNeedestParentTables : function(tables)
    {
        this.needestParentTables = tables;
        this.extraParams = {
            needestChildTables : this.getNeedestChildTables(),
            needestParentTables: this.getNeedestParentTables()
        };
    }   ,
    url: '../../serveur/web/app_dev.php/Data',
    constructor: function (config) {
        this.callParent(arguments);
        // Other initialization needed when this class is instantiated or subclassed
        this.setUrl('../../serveur/web/app_dev.php/Data/' + config.schema + '/' + config.table);
        if (config.useLimit === undefined)
        {
            config.useLimit = false;
        }
        else if (config.useLimit === true)
        {
            this.setPageParam('page');
            this.setStartParam('start');
            this.setLimitParam('limit');
        }
        else
        {
            this.setPageParam(false);
            this.setStartParam(false);
            this.setLimitParam(false);
        }
    },
    buildUrl: function ()
    {        
        var url = this.callParent(arguments);
        return  url + '&apiKey=' + AmsAuth.util.Authentification.apiKey;
    },
    reader:
            {
                type: 'json',
                rootProperty: 'datas',
                dateFormat: 'd/m/Y H:i:s',
                messageProperty: 'message',
                successProperty: 'success',
                totalProperty: 'total'
            }
    ,
    writer:
            {
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