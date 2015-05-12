Ext.define('AmsUi.util.EditRecordPanelController', {
    mixinId: 'ams-edit-record-panel-controller',
    setRecord: function (record)
    {
        if (this.getViewModel() !== undefined && this.getViewModel() !== null)
        {
            var viewModel = this.getViewModel();
            viewModel.setRecord(record);
        }
    },
    onCancelClick: function ()
    {
        var record = this.getView().getRecord();
        this.fireViewEvent('cancelClick', record);
    },
    onOkClick: function ()
    {
        if (this.getViewModel() !== undefined && this.getViewModel() !== null)
        {
            var viewModel = this.getViewModel();
            var record = this.getView().getRecord();
            viewModel.fillRecord(record);
            this.fireViewEvent('okClick', record);
        }

    }
    
});