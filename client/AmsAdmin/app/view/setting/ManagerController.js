Ext.define('AmsAdmin.view.setting.ManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.setting-manager',
    requires:[
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfRepository'
    ],
    init : function()
    {
        var me = this;
        AmsAdmin.getApplication().on('logginSuccess',function(){
            me.fillParamFields.call(me);
        });
    },
    onUpdateGlobalExtendClick : function()
    {
        
    },
    fillParamFields : function()
    {
        
    }
    
});
