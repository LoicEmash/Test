Ext.define("AmsUi.view.generic.Detail", {
    extend: "Ext.panel.Panel",
    xtype: 'ams-generic-detail',
    controller: "generic-detail",
    viewModel: {
        type: "generic-model"
    },
    requires: [
        'AmsUi.view.generic.DetailModel',
        'AmsUi.view.generic.DetailController',
        'AmsUi.util.EditRecordPanel',
        'AmsUi.form.field.PictureBox'

    ],
    config: {
        classInfo: null
    },
    layout: 'fit',
    mixins: {
        recordEditor: 'AmsUi.util.EditRecordPanel'

    },
    referenceStores: [],
    recurseCreateReferenceFields: function (field, targetField, stores, allowNull)
    {
        var me = this;
        var fields = [];
        var referenceStore = AmsUi.util.Generic.getReferenceStore(targetField.reference.cls);
        if (this.isStoreReferenced(referenceStore) === false)
        {
            this.referenceStores.push(referenceStore);
            var control = null;
            if (stores.length === 0)
            {
                control = Ext.create('Ext.form.field.ComboBox', {
                    xtype: 'combo',
                    reference: 'combo' + targetField.reference.cls.entityName,
                    store: Ext.create('Ext.data.ChainedStore', {
                        source: referenceStore
                    }),
                    valueField: 'id',
                    displayField: 'lib',
                    queryMode: 'local',
                    editable: false,
                    readOnly: this.getReadOnly(),
                    allowBlank: allowNull,
                    fieldLabel: field.displayName,
                    margin: 4,
                    bind: {
                        value: '{' + field.getName() + '}'
                    }
                });

            }
            else
            {

                var entityName = referenceStore.model.entityName;
                var refIdfieldName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + 'Id';
                control = Ext.create('Ext.form.field.ComboBox', {
                    xtype: 'combo',
                    store: Ext.create('Ext.data.ChainedStore', {
                        source: referenceStore,
                        remoteFilter: false,
                        sorters: 'lib',
                        remoteSort: false
                    }),
                    reference: 'combo' + targetField.reference.cls.entityName,
                    valueField: 'id',
                    displayField: 'lib',
                    queryMode: 'local',
                    editable: false,
                    readOnly: this.getReadOnly(),
                    allowBlank: allowNull,
                    fieldLabel: targetField.displayName,
                    margin: 4,
                    bind: {
                        value: '{' + refIdfieldName + '}'
                    },
                    listeners: {
                        change: function (combo, newValue, oldValue, eOpts)
                        {
                            me.onParentComboChange.call(me, combo, newValue, oldValue, eOpts);
                        }
                    }
                });

            }

            for (var i = 0; i < referenceStore.model.getFields().length; i++)
            {
                var fieldRef = referenceStore.model.getFields()[i];
                if (fieldRef.reference !== undefined && fieldRef.reference !== null)
                {
                    fields = fields.concat(this.recurseCreateReferenceFields(field, fieldRef, stores.concat([referenceStore])));
                }
            }
            fields.push(control);

        }
        return fields;

    },
    onParentComboChange: function (combo, newValue, oldValue, eOpts)
    {
        var store = combo.getStore();
        var model = store.getModel();

        for (var k in  model.schema.entities)
        {
            if (model.schema.entities.hasOwnProperty(k))
            {
                var entity = model.schema.entities[k];
                for (var j = 0; j < entity.cls.getFields().length; j++)
                {
                    var field = entity.cls.getFields()[j];

                    if (field.reference !== undefined && field.reference !== null)
                    {
                        if (model.entityName === field.reference.cls.entityName)
                        {
                            var comboChild = this.down('[reference=combo' + entity.cls.entityName + ']');
                            if (comboChild !== null)
                            {
                                this.updateComboChildFilters(comboChild);
                               
                            }
                        }
                    }
                }
            }
        }
    },
    updateComboChildFilters: function (combo)
    {
        var store = combo.getStore();
        var model = store.getModel();
        combo.getStore().clearFilter(true);
       
        for (var j = 0; j < model.getFields().length; j++)
        {
            var field = model.getFields()[j];

            if (field.reference !== undefined && field.reference !== null)
            {                
                var comboParent = this.down('[reference=combo' + field.reference.cls.entityName + ']');
                if (comboParent !== null)
                {
                    var parentEntityName = field.reference.cls.entityName ;
                    var refIdfieldName = parentEntityName.substring(0, 1).toLowerCase() + parentEntityName.substring(1) + 'Id';
                     combo.getStore().addFilter({
                         property:refIdfieldName,
                         value:comboParent.getValue()
                     });                   
                }
                
            }
        }
        combo.clearValue();
        if (combo.getStore().getCount() === 1)
        {
            var firstRecord = combo.getStore().getAt(0);
            var firstId = firstRecord.get('id');
            combo.setValue(firstId);
                    
        }
        

    },
    isStoreReferenced: function (store)
    {
        var referenced = false;
        for (var i = 0; i < this.referenceStores.length; i++)
        {
            if (store.model.entityName === this.referenceStores[i].model.entityName)
            {
                referenced = true;
            }
        }
        return referenced;
    },
    initComponent: function () {
        var buttons = [];
        if (this.getReadOnly() === false)
        {
            buttons = [{
                    text: AmsLocale.util.Locale.txtCancel,
                    hidden: this.getReadOnly(),
                    scale: 'medium',
                    iconCls: 'icon-cancel-medium',
                    handler: 'onCancelClick'
                }, {
                    text: AmsLocale.util.Locale.txtOk,
                    hidden: this.getReadOnly(),
                    scale: 'medium',
                    iconCls: 'icon-ok-medium',
                    formBind: true,
                    disabled: true,
                    handler: 'onOkClick'
                }];
        }
        var classInfo = this.getClassInfo();
        this.referenceStores = [];
        var formFields = [];
        for (var i = 0; i < classInfo.getFields().length; i++)
        {
            var field = classInfo.getFields()[i];
            var fieldName = field.getName();

            if (fieldName !== 'id')
            {
                if (field.reference !== undefined && field.reference !== null)
                {
                    var hierarchy = this.recurseCreateReferenceFields(field, field, [], field.getAllowNull());
                    formFields = formFields.concat(hierarchy);

                }
                else
                {
                    if (field.uiType === 'image')
                    {
                        formFields.push({
                            xtype: 'picturebox',
                            readOnly: this.getReadOnly(),
                            allowBlank: field.getAllowNull(),
                            fieldLabel: field.displayName,
                            margin: 4,
                            bind: {
                                value: '{' + field.getName() + '}'
                            }
                        });
                    }
                    else if (field.uiType === 'geom')
                    {

                    }
                    else if (field.getType() === 'string')
                    {
                        formFields.push({
                            xtype: 'textfield',
                            readOnly: this.getReadOnly(),
                            allowBlank: field.getAllowNull(),
                            fieldLabel: field.displayName,
                            margin: 4,
                            bind: {
                                value: '{' + field.getName() + '}'
                            }
                        });

                    }
                    else if (field.getType() === 'int')
                    {
                        formFields.push({
                            xtype: 'numberfield',
                            readOnly: this.getReadOnly(),
                            allowBlank: field.getAllowNull(),
                            fieldLabel: field.displayName,
                            margin: 4,
                            bind: {
                                value: '{' + field.getName() + '}'
                            }
                        });
                    }
                    else if (field.getType() === 'date')
                    {
                        formFields.push({
                            xtype: 'datefield',
                            readOnly: this.getReadOnly(),
                            allowBlank: field.getAllowNull(),
                            fieldLabel: field.displayName,
                            margin: 4,
                            bind: {
                                value: '{' + field.getName() + '}'
                            }
                        });

                    }
                    else if (field.getType() === 'number')
                    {
                        formFields.push({
                            xtype: 'numberfield',
                            readOnly: this.getReadOnly(),
                            allowBlank: field.getAllowNull(),
                            fieldLabel: field.displayName,
                            margin: 4,
                            bind: {
                                value: '{' + field.getName() + '}'
                            }
                        });

                    }
                    else if (field.getType() === 'boolean' || field.getType() === 'bool')
                    {
                        formFields.push({
                            xtype: 'checkbox',
                            readOnly: this.getReadOnly(),
                            allowBlank: field.getAllowNull(),
                            fieldLabel: field.displayName,
                            margin: 4,
                            bind: {
                                value: '{' + field.getName() + '}'
                            }
                        });
                    }
                    else
                    {
                        console.log('type non géré ' + field.getType());
                    }


                }
            }
        }
        formFields.push({
            xtype: 'container',
            flex: 1
        });
        this.items = [
            {
                xtype: 'form',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: formFields,
                buttons: buttons
            }
        ];
        this.referenceStores = [];
        this.callParent(arguments);
    }
});
