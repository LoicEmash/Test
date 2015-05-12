// @charset UTF8
Ext.define('AmsData.util.Status', {
    singleton: true,
    globalProgressBarCmpId : 'global-progressbar',
     requires:[
         'AmsLocale.util.Locale'
    ],
 
    setText : function(statusText)
    {
        var globalProgressBar = Ext.getCmp(AmsData.util.Status.globalProgressBarCmpId);
        globalProgressBar.updateText(statusText);
    },
    clear : function()
    {
         var globalProgressBar = Ext.getCmp(AmsData.util.Status.globalProgressBarCmpId);
         globalProgressBar.updateText(AmsLocale.util.Locale.txtPret);
         globalProgressBar.updateProgress(0);
    },
    setProgress : function(percent)
    {
         var globalProgressBar = Ext.getCmp(AmsData.util.Status.globalProgressBarCmpId);
        globalProgressBar.updateProgress(percent/100);
        //updateProgress
    }
    
});