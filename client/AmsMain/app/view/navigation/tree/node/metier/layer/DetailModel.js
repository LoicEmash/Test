Ext.define('AmsMain.view.navigation.tree.node.metier.layer.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.navigation-tree-node-metier-layer-detail',
    data: {
        schema: '',
        table:'',
        libelle:''
    },
    requires:[
        'AmsUi.util.EditRecordPanelModel'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanelModel'
    },
    setRecord: function (record)
    {
       if (record.get('jsonParam') !== null)
        {
             var params = Ext.JSON.decode(record.get('jsonParam'),true);
             if (params !== null)
             { 
                 this.set('schema',params.schema);
                 this.set('table',params.table);                         
             }
        }
       
        this.set('libelle',record.get('lib'));
    },
    fillRecord: function (record)
    {
        var params = {};
        params.nodeType = 'layer';
        params.layerType = 'metier';
        params.schema=this.get('schema');
        params.table=this.get('table');
        record.set('jsonParam',Ext.JSON.encode(params));
        record.set('lib',this.get('libelle'));
    }

});
