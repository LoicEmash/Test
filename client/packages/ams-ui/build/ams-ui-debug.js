Ext.define('AmsUi.form.field.PictureBox', {
    extend: 'Ext.form.field.Text',
    alias: [
        'widget.picturebox'
    ],
    requires: [
        'Ext.form.field.FileButton',
        'Ext.form.trigger.Component'
    ],
    needArrowKeys: false,
    triggers: {
        filebutton: {
            type: 'component',
            hideOnReadOnly: false,
            // Most form fields prevent the default browser action on mousedown of the trigger.
            // This is intended to prevent the field's input element from losing focus when
            // the trigger is clicked.  File fields disable this behavior because:
            // 1. The input element does not receive focus when the field is focused. The button does.
            // 2. Preventing the default action of touchstart (translated from mousedown
            // on mobile browsers) prevents the browser's file dialog from opening.
            preventMouseDown: false
        }
    },
    preSubTpl: [
        '<div id="{cmpId}-triggerWrap" data-ref="triggerWrap" class="{triggerWrapCls} {triggerWrapCls}-{ui}">',
        '<div id={cmpId}-inputWrap data-ref="inputWrap" class="{inputWrapCls} {inputWrapCls}-{ui}"><img alt="Click to edit" width="64" height="64" src="resources/icons/64x64/unknow-user.png"/>'
    ],
    postSubTpl: [
        '</div>',
        // end inputWrap
        '<tpl for="triggers">{[values.renderTrigger(parent)]}</tpl>',
        '</div>'
    ],
    // end triggerWrap
    //<locale>
    /**
     * @cfg {String} buttonText
     * The button text to display on the upload button. Note that if you supply a value for
     * {@link #buttonConfig}, the buttonConfig.text value will be used instead if available.
     */
    buttonText: '',
    //</locale>
    /**
     * @cfg {Boolean} buttonOnly
     * True to display the file upload field as a button with no visible text field. If true, all
     * inherited Text members will still be available.
     */
    buttonOnly: false,
    /**
     * @cfg {Number} buttonMargin
     * The number of pixels of space reserved between the button and the text field. Note that this only
     * applies if {@link #buttonOnly} = false.
     */
    buttonMargin: 3,
    /**
     * @cfg {Boolean} clearOnSubmit
     * True to clear the selected file value when the form this field belongs to
     * is submitted to the server.
     */
    clearOnSubmit: true,
    /**
     * @cfg {Object} buttonConfig
     * Specify optional custom button {@link Ext.button.Button} config (eg. iconCls, text) for the upload button
     */
    /**
     * @event change
     * Fires when the underlying file input field's value has changed from the user selecting a new file from the system
     * file selection dialog.
     * @param {Ext.ux.form.FileUploadField} this
     * @param {String} value The file value returned by the underlying file input field
     */
    /**
     * @property {Ext.dom.Element} fileInputEl
     * A reference to the invisible file input element created for this upload field. Only populated after this
     * component is rendered.
     */
    /**
     * @property {Ext.button.Button} button
     * A reference to the trigger Button component created for this upload field. Only populated after this component is
     * rendered.
     */
    // private
    extraFieldBodyCls: Ext.baseCSSPrefix + 'form-file-wrap',
    // private
    inputCls: Ext.baseCSSPrefix + 'form-text-file',
    /**
     * @cfg {Boolean} [readOnly=true]
     * Unlike with other form fields, the readOnly config defaults to true in File field.
     */
    readOnly: false,
    /**
     * @cfg {Boolean} editable
     * @inheritdoc
     */
    editable: true,
    submitValue: true,
    /**
     * Do not show hand pointer over text field since file choose dialog is only shown when clicking in the button
     * @private
     */
    triggerNoEditCls: '',
    // @private
    // Extract the file element, button outer element, and button active element.
    childEls: [
        'browseButtonWrap'
    ],
    // @private
    applyTriggers: function(triggers) {
        var me = this,
            triggerCfg = (triggers || {}).filebutton;
        if (triggerCfg) {
            triggerCfg.component = Ext.apply({
                xtype: 'filebutton',
                ownerCt: me,
                id: me.id + '-button',
                ui: me.ui,
                hidden: true,
                disabled: me.disabled,
                text: me.buttonText,
                style: me.buttonOnly ? '' : me.getButtonMarginProp() + me.buttonMargin + 'px',
                inputName: me.getName(),
                listeners: {
                    scope: me,
                    change: me.onFileChange
                }
            }, me.buttonConfig);
            return me.callParent([
                triggers
            ]);
        } else {
            Ext.Error.raise(me.$className + ' requires a valid trigger config containing "filebutton" specification');
        }
    },
    getSubTplData: function(fieldData) {
        var data = this.callParent([
                fieldData
            ]);
        // Input field itself should not be focusable since it's always decorative;
        // however the input element is naturally focusable (and tabbable) so we have to
        // deactivate it by setting its tabIndex to -1.
        //data.tabIdx = -1;
        data.inputAttrTpl = "multiple";
        data.name = "files[]";
        return data;
    },
    // @private
    onRender: function() {
        var me = this,
            inputEl, button, buttonEl, trigger;
        me.callParent(arguments);
        inputEl = me.inputEl;
        inputEl.dom.name = '';
        //name goes on the fileInput, not the text input
        inputEl.dom.style.display = 'none';
        trigger = me.getTrigger('filebutton');
        button = me.button = trigger.component;
        me.fileInputEl = button.fileInputEl;
        buttonEl = button.el;
        if (me.buttonOnly) {
            me.inputWrap.setDisplayed(false);
            me.shrinkWrap = 3;
        }
        // Ensure the trigger element is sized correctly upon render
        trigger.el.setWidth(buttonEl.getWidth() + buttonEl.getMargin('lr'));
        if (Ext.isIE) {
            me.button.getEl().repaint();
        }
        me.updateImageSource(me.getValue());
    },
    updateImageSource: function(value) {
        var me = this;
        if (value === "") {
            value = null;
        }
        if (value === undefined) {
            value = null;
        }
        var imgEl = me.getEl().down('img').dom;
        if (value === null) {
            imgEl.src = "resources/icons/64x64/unknow-user.png";
        } else {
            imgEl.src = value;
        }
    },
    /**
     * Gets the markup to be inserted into the subTplMarkup.
     */
    getTriggerMarkup: function() {
        return '<td id="' + this.id + '-browseButtonWrap" data-ref="browseButtonWrap" role="presentation"></td>';
    },
    /**
     * @private Event handler fired when the user selects a file.
     */
    onFileChange: function(button, e, value) {
        var me = this;
        var files = e.target.files;
        if (files.length > 0) {
            var f = files[0];
            if (f.type.match('image.*')) {
                var reader = new FileReader();
                reader.onload = (function(f) {
                    return function(e) {
                        me.setValue.call(me, e.target.result);
                        me.updateImageSource(e.target.result);
                    };
                })(f);
                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
            } else {
                me.setValue.call(me, null);
                me.updateImageSource(null);
            }
        }
        this.duringFileSelect = true;
        delete this.duringFileSelect;
    },
    didValueChange: function() {
        return true;
    },
    // In the case of the file field, the change event will only ever fire 
    // if the value actually changes, so we always want to fire the change event
    // This affects Chrome specifically, because hitting the cancel button will
    // reset the file upload.
    //return !!this.duringFileSelect;
    /**
     * Overridden to do nothing
     * @method
     */
    // setValue: Ext.emptyFn,
    reset: function() {
        var me = this,
            clear = me.clearOnSubmit;
        if (me.rendered) {
            me.button.reset(clear);
            me.fileInputEl = me.button.fileInputEl;
            if (clear) {
                me.inputEl.dom.value = '';
                // Reset the underlying value if we're clearing it
                me.setValue.call(me, null);
                me.updateImageSource(null);
            }
        }
        me.callParent();
    },
    onShow: function() {
        this.callParent();
        // If we started out hidden, the button may have a messed up layout
        // since we don't act like a container
        this.button.updateLayout();
    },
    onDisable: function() {
        this.callParent();
        this.button.disable();
    },
    onEnable: function() {
        this.callParent();
        this.button.enable();
    },
    /**
     * @method
     * @inheritdoc
     */
    isFileUpload: Ext.returnTrue,
    extractFileInput: function() {
        var me = this,
            fileInput;
        if (me.rendered) {
            fileInput = me.button.fileInputEl.dom;
            me.reset();
        } else {
            // Create a fake empty field here so it will still be submitted.
            // All other unrendered fields provide a value.
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.className = Ext.baseCSSPrefix + 'hidden-display';
            fileInput.name = "files[]";
            fileInput.setAttribute("multiple", "true");
        }
        return fileInput;
    },
    restoreInput: function(el) {
        // If we're not rendered we don't need to do anything, it will be created
        // when we get flushed to the DOM.
        if (this.rendered) {
            var button = this.button;
            button.restoreInput(el);
            this.fileInputEl = button.fileInputEl;
        }
    },
    onDestroy: function() {
        this.fileInputEl = this.button = null;
        this.callParent();
    },
    getButtonMarginProp: function() {
        return 'margin-left:';
    },
    privates: {
        getFocusEl: function() {
            return this.button;
        }
    },
    listeners: {
        afterrender: function(sc) {
            var me = this;
            var imgEl = sc.getEl().down('img').dom;
            imgEl.addEventListener('click', function() {
                if (me.readOnly === false) {
                    me.button.getEl().down('input').dom.click();
                }
            }, false);
        },
        change: function(sc, newValue) {
            sc.updateImageSource(newValue);
        }
    }
});

Ext.define('AmsUi.util.EditRecordPanel', {
    mixinId: 'ams-edit-record-panel',
    config: {
        readOnly: true,
        record: null
    },
    setRecord: function(record) {
        this.record = record;
        if (this.getController() !== undefined && this.getController() !== null) {
            var controller = this.getController();
            controller.setRecord(record);
        }
    }
});

Ext.define('AmsUi.util.EditRecordPanelController', {
    mixinId: 'ams-edit-record-panel-controller',
    setRecord: function(record) {
        if (this.getViewModel() !== undefined && this.getViewModel() !== null) {
            var viewModel = this.getViewModel();
            viewModel.setRecord(record);
        }
    },
    onCancelClick: function() {
        var record = this.getView().getRecord();
        this.fireViewEvent('cancelClick', record);
    },
    onOkClick: function() {
        if (this.getViewModel() !== undefined && this.getViewModel() !== null) {
            var viewModel = this.getViewModel();
            var record = this.getView().getRecord();
            viewModel.fillRecord(record);
            this.fireViewEvent('okClick', record);
        }
    }
});

Ext.define('AmsUi.util.EditRecordPanelModel', {
    mixinId: 'ams-edit-record-panel-model',
    setRecord: function(record) {
        throw "unimplemented method";
    },
    fillRecord: function(record) {
        throw "unimplemented method";
    }
});

// @charset UTF8
Ext.define('AmsUi.util.EditRecordService', {
    requires: [
        'Ext.window.Window',
        'AmsLocale.util.Locale'
    ],
    singleton: true,
    deleteRecord: function(message, record, store, successCalback, failureCallback) {
        Ext.Msg.show({
            title: AmsLocale.util.Locale.txtConfirmDelete,
            //var urlExt = 
            message: message,
            //'Etes-vous sur de vouloir supprimer la fonction ' + lib + ' ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    store.remove(record);
                    store.sync({
                        success: function() {
                            if (successCalback !== undefined) {
                                successCalback();
                            }
                        },
                        failure: function() {
                            Ext.Msg.alert(AmsLocale.util.Locale.txtErreur, AmsLocale.util.Locale.txtDbErreur);
                            if (failureCallback !== undefined) {
                                failureCallback();
                            }
                        }
                    });
                }
            }
        });
    },
    editRecord: function(title, editorXtype, record, store, successCalback, failureCallback) {
        var window = Ext.create('Ext.window.Window', {
                title: title,
                modal: true,
                layout: 'fit',
                items: {
                    xtype: editorXtype,
                    readOnly: false,
                    record: record,
                    listeners: {
                        okClick: function(editorRecord) {
                            window.mask(AmsLocale.util.Locale.txtMajDonnees);
                            editorRecord.save({
                                callback: function(savedRecord, operation) {
                                    if (operation.wasSuccessful() && savedRecord !== null) {
                                        store.load({
                                            callback: function() {
                                                window.unmask();
                                                window.close();
                                                if (successCalback !== undefined) {
                                                    successCalback();
                                                }
                                            }
                                        });
                                    } else {
                                        window.unmask();
                                        Ext.Msg.alert(AmsLocale.util.Locale.txtErreur, AmsLocale.util.Locale.txtDbErreur);
                                        if (failureCallback !== undefined) {
                                            failureCallback();
                                        }
                                    }
                                }
                            });
                        },
                        cancelClick: function() {
                            window.close();
                        }
                    }
                }
            });
        window.show();
    }
});

// @charset UTF8
Ext.define('AmsUi.util.Param', {
    requires: [
        'AmsDomainPrf.model.PrfUsrParam'
    ],
    singleton: true,
    paramStore: null,
    loadParams: function(callback) {
        if (AmsUi.util.Param.paramStore === null) {
            AmsUi.util.Param.paramStore = Ext.create('Ext.data.Store', {
                model: 'AmsDomainPrf.model.PrfUsrParam',
                autoSync: false,
                proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
                    schema: 'Prf',
                    table: 'PrfUsrParam',
                    useLimit: false
                })
            });
        }
        AmsUi.util.Param.paramStore.clearFilter(true);
        AmsUi.util.Param.paramStore.addFilter({
            property: 'login',
            value: AmsAuth.util.Authentification.userLogin
        }, true);
        AmsUi.util.Param.paramStore.load({
            callback: callback
        });
    },
    getParam: function(schema, code, defaultValue) {
        var value = defaultValue;
        AmsUi.util.Param.paramStore.each(function(item) {
            if (item.get("sch") === schema && item.get('code') === code) {
                value = item.get('val');
            }
        });
        return value;
    },
    setParam: function(schema, code, value) {
        var param = null;
        AmsUi.util.Param.paramStore.each(function(item) {
            if (item.get("sch") === schema && item.get('code') === code) {
                param = item;
            }
        });
        if (param !== null) {
            param.set('val', value);
        } else {
            param = Ext.create('AmsDomainPrf.model.PrfUsrParam');
            param.set('login', AmsAuth.util.Authentification.userLogin);
            param.set('sch', schema);
            param.set('code', code);
            param.set('val', value);
            AmsUi.util.Param.paramStore.add(param);
        }
        AmsUi.util.Param.paramStore.sync();
    }
});

