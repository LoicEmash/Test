// @charset UTF8
Ext.define('AmsUi.util.EditRecordService', {
    requires: [
        'Ext.window.Window',
        'AmsLocale.util.Locale'
    ],
    singleton: true,
    deleteRecord: function (message, record, store, successCalback, failureCallback)
    {
        Ext.Msg.show({
            title: AmsLocale.util.Locale.txtConfirmDelete,
            //var urlExt = 
            message: message,
            //'Etes-vous sur de vouloir supprimer la fonction ' + lib + ' ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    store.remove(record);
                    store.sync({
                        success: function ()
                        {
                            if (successCalback !== undefined)
                            {
                                successCalback();
                            }
                        },
                        failure: function ()
                        {
                            Ext.Msg.alert(AmsLocale.util.Locale.txtErreur, AmsLocale.util.Locale.txtDbErreur);
                            if (failureCallback !== undefined)
                            {
                                failureCallback();
                            }
                        }
                    });
                }
            }
        });
    },
    editRecord: function (title, editorXtype, record, store, successCalback, failureCallback,classInfo)
    {
        var window = Ext.create('Ext.window.Window', {
            title: title,
            modal: true,
            layout: 'fit',
            items: {
                xtype: editorXtype,
                readOnly: false,
                classInfo:classInfo,
                record: record,
                listeners: {
                    okClick: function (editorRecord)
                    {
                        window.mask(AmsLocale.util.Locale.txtMajDonnees);
                        editorRecord.save({
                            callback: function (savedRecord, operation) {
                                if (operation.wasSuccessful() && savedRecord !== null) {
                                    store.load({
                                        callback: function () {
                                            window.unmask();
                                            window.close();
                                            if (successCalback !== undefined)
                                            {
                                                successCalback();
                                            }
                                        }
                                    });

                                } else {
                                    window.unmask();
                                    Ext.Msg.alert(AmsLocale.util.Locale.txtErreur, AmsLocale.util.Locale.txtDbErreur);
                                    if (failureCallback !== undefined)
                                    {
                                        failureCallback();
                                    }
                                }
                            }
                        });
                    },
                    cancelClick: function ()
                    {
                        window.close();
                    }
                }
            }
        });
        window.show();
    }
});
