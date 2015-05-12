// @charset UTF8
Ext.define('AmsMain.util.Global', {
    extend: 'Ext.util.Observable',
    singleton: true,
    activeThemeId: null,
    loadTheme: function (themeId)
    {
        AmsMain.util.Global.activeThemeId = themeId;
        AmsMain.util.Global.fireEvent('activeThemeChange', themeId);
       
    },
    isTreeRecordLayer: function (treeRecord)
    {
        var jsonParam = treeRecord.get('jsonParam');
        if (jsonParam !== undefined && jsonParam !== null)
        {
            var params = Ext.JSON.decode(jsonParam, true);
            if (params !== null)
            {
                if (params.nodeType === 'layer')
                {
                    return true;
                }
            }
            return false;
        }
    },
    isTreeRecordLayerTile: function (treeRecord)
    {
        var jsonParam = treeRecord.get('jsonParam');
        if (jsonParam !== undefined && jsonParam !== null)
        {
            var params = Ext.JSON.decode(jsonParam, true);
            if (params !== null)
            {
                if (params.nodeType === 'layer')
                {
                    if (params.layerType === 'tile')
                    { return true;}
                   
                }
            }
            return false;
        }
    }


});