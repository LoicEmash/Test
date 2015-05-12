Ext.define('AmsMain.view.navigation.tree.node.tile.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.navigation-tree-node-tile-detail',
    data: {
        type: null,
        libelle: null
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
             { this.set('type',params.tileSource);}
        }
       
        this.set('libelle',record.get('lib'));
    },
    fillRecord: function (record)
    {
        var params = {};
        params.nodeType = 'layer';
        params.layerType='tile';
        params.tileSource=this.get('type');
        record.set('jsonParam',Ext.JSON.encode(params));
        record.set('lib',this.get('libelle'));
    }


});
