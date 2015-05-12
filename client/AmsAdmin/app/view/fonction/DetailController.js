Ext.define('AmsAdmin.view.fonction.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fonction-detail',
    onComboSocieteChange: function (comboSociete, newValue)
    {
        if (comboSociete !== null)
        {
            var comboService = this.lookupReference('comboService');
            comboService.getStore().clearFilter(true);
            comboService.clearValue();
            comboService.getStore().addFilter({
                property: 'prfSteId',
                value: newValue
            });
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

    },
    setRecord: function (fonctionRecord)
    {
        if (this.getViewModel() !== undefined && this.getViewModel() !== null)
        {
            var viewModel = this.getViewModel();
            viewModel.setRecord(fonctionRecord);
        }
    }
});
