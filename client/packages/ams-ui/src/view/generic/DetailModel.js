Ext.define('AmsUi.view.generic.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.generic-model',
    data: {
        name: 'libelle'
    },
    requires: [
        'AmsUi.util.EditRecordPanelModel'
    ],
    mixins: {
        recordEditor: 'AmsUi.util.EditRecordPanelModel'
    },
    recurseSetRecord: function (record, field)
    {
        var referenceStore = AmsUi.util.Generic.getReferenceStore(field.reference.cls);
        var entityName = referenceStore.model.entityName;
        var refIdfieldName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + 'Id';
        if (record !== null)
        {
            var refId = record.get(refIdfieldName);
            this.set(refIdfieldName, refId);
            var nextRecord = referenceStore.findRecord('id', refId);
            var fields = referenceStore.model.getFields();
            for (var i = 0; i < fields.length; i++)
            {
                if (fields[i].reference !== undefined && fields[i].reference !== null)
                {
                    this.recurseSetRecord(nextRecord, fields[i]);
                }
            }
        }

    },
    setRecord: function (record)
    {
        var fields = record.fields;
        for (var i = 0; i < fields.length; i++)
        {
            this.set(fields[i].getName(), record.get(fields[i].getName()));
            if (fields[i].reference !== undefined && fields[i].reference !== null)
            {
                this.recurseSetRecord(record, fields[i]);
            }
        }

    },
    fillRecord: function (record)
    {

        var fields = record.fields;
        for (var i = 0; i < fields.length; i++)
        {
            record.set(fields[i].getName(), this.get(fields[i].getName()));
        }
    }

});
