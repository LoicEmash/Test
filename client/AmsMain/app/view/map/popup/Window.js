
Ext.define("AmsMain.view.map.popup.Window", {
    extend: "Ext.window.Window",
    title: 'Informations',
    hidden: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    modal: false,
    config: {
        classInfo: null,
        recordId: null,
    },
    formGeneric : null,
    requires: [
        'AmsMain.view.map.popup.WindowController',
    ],
    controller: "map-popup-window",
    setInfos: function (classInfo, id)
    {
        var me = this;
        if (this.classInfo === null || classInfo.displayName !== this.classInfo.displayName)
        {
            this.classInfo = classInfo;
           
            me.removeAll();
            me.formGeneric = Ext.create('AmsUi.view.generic.Detail', {
                classInfo: classInfo,
                readOnly: true
            });
            me.removeAll();
            me.add(me.formGeneric );
        }
       
        if (this.classInfo === null || classInfo.displayName !== this.classInfo.displayName || id !== this.recordId)
        {
            var store = Ext.create('Ext.data.Store', {
                model: classInfo.displayName,
                remoteSort: true,
                remoteFilter: true,
                proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
                    schema: classInfo.schema.id,
                    table: classInfo.entityName,
                    useLimit: true
                })});
            store.addFilter({
                property: "id",
                value: id
            }, true);

            this.recordId = id;
            me.mask("Charegement ...");
            store.load({
                callback: function (records, operation, success)
                {
                    me.unmask();

                    if (records !== null && success === true)
                    {
                        if (records.length === 1)
                        {
                            me.formGeneric.setRecord(records[0]);
                        }
                    }

                }
            });
        }
        




    },
    initComponent: function () {

        this.callParent(arguments);
    }

});
