Ext.define('AmsMain.view.navigation.tree.node.folder.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.navigation-tree-node-folder-detail',
    data: {
        name: 'libelle'
    },
    requires:[
        'AmsUi.util.EditRecordPanelModel'
    ],
    mixins: {
	recordEditor:'AmsUi.util.EditRecordPanelModel'
    },
    setRecord: function (record)
    {
        this.set('libelle',record.get('lib'));
    },
    fillRecord: function (record)
    {
        var params = {};
        params.nodeType = 'folder';
        record.set('jsonParam',Ext.JSON.encode(params));
        record.set('lib',this.get('libelle'));
    }

});
