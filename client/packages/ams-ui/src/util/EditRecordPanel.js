Ext.define('AmsUi.util.EditRecordPanel', {
    mixinId: 'ams-edit-record-panel',
    config: {
        readOnly: true,
        record: null
    },
    setRecord: function (record)
    {
        this.record = record;
        if (this.getController() !== undefined && this.getController() !== null)
        {
            var controller = this.getController();
            controller.setRecord(record);
        }
    }
});