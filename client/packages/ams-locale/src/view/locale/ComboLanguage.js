
Ext.define("AmsLocale.view.locale.ComboLanguage", {
    extend: "Ext.form.field.ComboBox",
    requires: [
        'Ext.form.field.ComboBox',
        'AmsLocale.util.Locale'
    ],
    queryMode: 'local',
    displayField: 'libelle',
    valueField: 'code',
    xtype: 'ams-combo-lang',
    editable: false,
    watchChange : true,
    listeners: {
        change: function (cb, newValue, oldValue, eOpts)
        {
            if (this.watchChange === true)
            {AmsLocale.util.Locale.switchLang(newValue);}
            
        },
        afterrender: function ()
        {
            this.watchChange = false;
            var currentLang = AmsLocale.util.Locale.getCurrentLang();
            console.log(currentLang);
            this.setValue(currentLang);
            this.watchChange = true;
        }
    },
    initComponent: function () {
        this.setStore(Ext.create('Ext.data.Store', {
            fields: ['code', 'libelle'],
            data: [
                {"code": "fr", "libelle": AmsLocale.util.Locale.txtLangFr},
                {"code": "en", "libelle": AmsLocale.util.Locale.txtLangEn}

            ]
        }));

        //this.setValue(AmsLocale.util.Locale.currentLang);
        //this.setFieldLabel(AmsLocale.util.Locale.txtLang);

        // this.setValue(currentLang);



        this.callParent(arguments);
    }



});
