/* global AmsAuth */
/* global AmsMain */
/* global AmsUi */
/* global Ext */
Ext.define('AmsMain.view.navigation.theme.SelectorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigation-theme-selector',
    requires: [
        'AmsAuth.util.Authentification',
        'AmsMain.view.navigation.theme.Detail',
        'AmsUi.util.EditRecordService'
    ],
    init: function ()
    {
        var me = this;

        AmsMain.getApplication().on('logginSuccess', function () {
            me.showEditThemeButtons.call(me, AmsAuth.util.Authentification.canEditSigTheme());
            me.autoSelectTheme.call(me);
        });

        AmsMain.util.Global.on('activeThemeChange', function () {
            me.setEditThemeButtonsState.call(me);
        });
    },
    autoSelectTheme: function ()
    {
        var selectedThemeId = AmsUi.util.Param.getParam('Sig', 'SelectedThemeId', null);
        
        var comboTheme = this.lookupReference('comboTheme');
        if (selectedThemeId !== null)
        {
            comboTheme.getStore().load({
                callback: function ()
                {
                   
                    var record = comboTheme.getStore().findRecord('id', selectedThemeId);
                    comboTheme.select(record);
                }
            });
        }


    },
    setEditThemeButtonsState: function ()
    {
        var btEditTheme = this.lookupReference('btEditTheme');
        var btDeleteTheme = this.lookupReference('btDeleteTheme');
        if (AmsMain.util.Global.activeThemeId === null)
        {
            btEditTheme.disable();
            btDeleteTheme.disable();
        }
        else
        {
            btEditTheme.enable();
            btDeleteTheme.enable();
        }
    },
    showEditThemeButtons: function (show)
    {
        var panelEditThemeButtons = this.lookupReference('panelEditThemeButtons');
        if (show)
        {
            panelEditThemeButtons.show();
        }
        else
        {
            panelEditThemeButtons.hide();
        }

    },
    onAddThemeClick: function ()
    {
        var record = Ext.create('AmsDomainSig.model.SigTheme');
        var themeStore = Ext.data.StoreManager.lookup('AmsMain.store.Theme');
        AmsUi.util.EditRecordService.editRecord("Nouveau théme", 'ams-navigation-theme-detail', record, themeStore, function () {
            AmsMain.getApplication().fireEvent('themeAdded');
        });

    },
    onEditThemeClick: function ()
    {
        var comboTheme = this.lookupReference('comboTheme');
        var record = comboTheme.getStore().findRecord('id', comboTheme.getValue());
        if (record !== null)
        {
            var themeStore = Ext.data.StoreManager.lookup('AmsMain.store.Theme');
            AmsUi.util.EditRecordService.editRecord("Modification d'un thème", 'ams-navigation-theme-detail', record, themeStore, function () {
                AmsMain.getApplication().fireEvent('themeEdited');
            });
        }

    },
    onDeleteThemeClick: function ()
    {
        var comboTheme = this.lookupReference('comboTheme');
        var record = comboTheme.getStore().findRecord('id', comboTheme.getValue());
        if (record !== null)
        {
            var message = Ext.util.Format.format("Etes-vous sur de vouloir supprimer le thème {0}", record.get('lib'));
            AmsUi.util.EditRecordService.deleteRecord(message, record, comboTheme.getStore(), function () {
                comboTheme.clearValue();
                AmsMain.getApplication().fireEvent('themeRemoved');
            });

        }
    }
});
