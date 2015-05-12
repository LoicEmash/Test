Ext.define('AmsAdmin.view.service.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.service-detail',
  
    onCancelClick : function()
    {
        var record = this.getView().getRecord();           
        this.fireViewEvent('cancelClick',record);       
    },
    onOkClick : function()
    {
        if (this.getViewModel() !== undefined && this.getViewModel() !== null)
        {
            var viewModel = this.getViewModel();
            var record = this.getView().getRecord();
            viewModel.fillRecord(record);
            this.fireViewEvent('okClick',record);
        }
        
    },
    setRecord: function (serviceRecord)
    {

        if (this.getViewModel() !== undefined && this.getViewModel() !== null)
        {
            var viewModel = this.getViewModel();
            viewModel.setRecord(serviceRecord);
        }
    }
    
});
