Ext.define('AmsMain.model.WebTree', {
    requires:[
        'AmsData.data.proxy.SecureRestProxy'
    ],
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',  type: 'int'},
        {name: 'name',   type: 'string'}
    ],
    proxy : Ext.create('AmsData.data.proxy.SecureRestProxy',{table:'WebTree'})
    

    
});