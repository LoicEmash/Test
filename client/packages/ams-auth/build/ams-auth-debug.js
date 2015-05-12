// @charset UTF8
Ext.define('AmsAuth.crypto.Sha1', {
    singleton: true,
    /**
     * Generates SHA-1 hash of string.
     *
     * @param   {string} msg - (Unicode) string to be hashed.
     * @returns {string} Hash of msg as hex character string.
     */
    hash: function(msg) {
        /** Extend String object with method to encode multi-byte string to utf8
         *  - monsur.hossa.in/2012/07/20/utf-8-in-javascript.html */
        if (typeof String.prototype.utf8Encode === 'undefined') {
            String.prototype.utf8Encode = function() {
                return unescape(encodeURIComponent(this));
            };
        }
        /** Extend String object with method to decode utf8 string to multi-byte */
        if (typeof String.prototype.utf8Decode === 'undefined') {
            String.prototype.utf8Decode = function() {
                try {
                    return decodeURIComponent(escape(this));
                } catch (e) {
                    return this;
                }
            };
        }
        // invalid UTF-8? return as-is
        // convert string to UTF-8, as SHA only deals with byte-streams
        msg = msg.utf8Encode();
        // constants [§4.2.1]
        var K = [
                1518500249,
                1859775393,
                2.400959708E9,
                3.395469782E9
            ];
        // PREPROCESSING
        msg += String.fromCharCode(128);
        // add trailing '1' bit (+ 0's padding) to string [§5.1.1]
        // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
        var l = msg.length / 4 + 2;
        // length (in 32-bit integers) of msg + ‘1’ + appended length
        var N = Math.ceil(l / 16);
        // number of 16-integer-blocks required to hold 'l' ints
        var M = new Array(N);
        for (var i = 0; i < N; i++) {
            M[i] = new Array(16);
            for (var j = 0; j < 16; j++) {
                // encode 4 chars per integer, big-endian encoding
                M[i][j] = (msg.charCodeAt(i * 64 + j * 4) << 24) | (msg.charCodeAt(i * 64 + j * 4 + 1) << 16) | (msg.charCodeAt(i * 64 + j * 4 + 2) << 8) | (msg.charCodeAt(i * 64 + j * 4 + 3));
            }
        }
        // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
        // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
        // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
        // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
        M[N - 1][14] = ((msg.length - 1) * 8) / Math.pow(2, 32);
        M[N - 1][14] = Math.floor(M[N - 1][14]);
        M[N - 1][15] = ((msg.length - 1) * 8) & 4.294967295E9;
        // set initial hash value [§5.3.1]
        var H0 = 1732584193;
        var H1 = 4.023233417E9;
        var H2 = 2.562383102E9;
        var H3 = 271733878;
        var H4 = 3.28537752E9;
        // HASH COMPUTATION [§6.1.2]
        var W = new Array(80);
        var a, b, c, d, e;
        for (var i = 0; i < N; i++) {
            // 1 - prepare message schedule 'W'
            for (var t = 0; t < 16; t++) W[t] = M[i][t];
            for (var t = 16; t < 80; t++) W[t] = AmsAuth.crypto.Sha1.ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
            // 2 - initialise five working variables a, b, c, d, e with previous hash value
            a = H0;
            b = H1;
            c = H2;
            d = H3;
            e = H4;
            // 3 - main loop
            for (var t = 0; t < 80; t++) {
                var s = Math.floor(t / 20);
                // seq for blocks of 'f' functions and 'K' constants
                var T = (AmsAuth.crypto.Sha1.ROTL(a, 5) + AmsAuth.crypto.Sha1.f(s, b, c, d) + e + K[s] + W[t]) & 4.294967295E9;
                e = d;
                d = c;
                c = AmsAuth.crypto.Sha1.ROTL(b, 30);
                b = a;
                a = T;
            }
            // 4 - compute the new intermediate hash value (note 'addition modulo 2^32')
            H0 = (H0 + a) & 4.294967295E9;
            H1 = (H1 + b) & 4.294967295E9;
            H2 = (H2 + c) & 4.294967295E9;
            H3 = (H3 + d) & 4.294967295E9;
            H4 = (H4 + e) & 4.294967295E9;
        }
        return AmsAuth.crypto.Sha1.toHexStr(H0) + AmsAuth.crypto.Sha1.toHexStr(H1) + AmsAuth.crypto.Sha1.toHexStr(H2) + AmsAuth.crypto.Sha1.toHexStr(H3) + AmsAuth.crypto.Sha1.toHexStr(H4);
    },
    /**
     * Function 'f' [§4.1.1].
     * @private
     */
    f: function(s, x, y, z) {
        switch (s) {
            case 0:
                return (x & y) ^ (~x & z);
            // Ch()
            case 1:
                return x ^ y ^ z;
            // Parity()
            case 2:
                return (x & y) ^ (x & z) ^ (y & z);
            // Maj()
            case 3:
                return x ^ y ^ z;
        }
    },
    // Parity()
    /**
     * Rotates left (circular left shift) value x by n positions [§3.2.5].
     * @private
     */
    ROTL: function(x, n) {
        return (x << n) | (x >>> (32 - n));
    },
    /**
     * Hexadecimal representation of a number.
     * @private
     */
    toHexStr: function(n) {
        // note can't use toString(16) as it is implementation-dependant,
        // and in IE returns signed numbers when used on full words
        var s = "",
            v;
        for (var i = 7; i >= 0; i--) {
            v = (n >>> (i * 4)) & 15;
            s += v.toString(16);
        }
        return s;
    }
});

// @charset UTF8
Ext.define('AmsAuth.util.Authentification', {
    extend: 'Ext.util.Observable',
    requires: [
        'AmsLocale.util.Locale'
    ],
    singleton: true,
    apiKey: null,
    userNom: null,
    userPrenom: null,
    userLogin: null,
    userAvatar: null,
    userRights: null,
    userParamStore: null,
    authenticateFromCookies: function(successCallback, failureCallback) {
        console.log('authenticateFromCookies');
        var login = Ext.util.Cookies.get('userLogin');
        var sha1Password = Ext.util.Cookies.get('userPass');
        if (login !== null && sha1Password !== null) {
            console.log('authenticateFromCookies : ' + login + " " + sha1Password);
            this.authenticate(login, sha1Password, successCallback, failureCallback);
        } else {
            failureCallback();
        }
    },
    authenticate: function(login, sha1Password, successCallback, failureCallback) {
        Ext.Ajax.request({
            url: '../../serveur/web/app_dev.php/Authenticate/' + login + '/' + sha1Password,
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText, true);
                if (json !== null) {
                    if (json.apiKey !== undefined && json.apiKey !== null) {
                        AmsAuth.util.Authentification.setApiKey(json.apiKey);
                        AmsAuth.util.Authentification.setUserNom(json.nom);
                        AmsAuth.util.Authentification.setUserPrenom(json.prenom);
                        AmsAuth.util.Authentification.setUserAvatar(json.avatar);
                        AmsAuth.util.Authentification.setUserLogin(json.login);
                        AmsAuth.util.Authentification.setUserRights(json.rights);
                        var now = new Date();
                        var expiry = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
                        Ext.util.Cookies.set('userLogin', login, expiry);
                        Ext.util.Cookies.set('userPass', sha1Password, expiry);
                        /*
                        AmsAuth.util.Authentification.userParamStore = Ext.create('Ext.data.Store', {
                            model: 'AmsDomainPrf.model.PrfUsrParam',
                            proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
                                schema: 'Prf',
                                table: 'PrfUsrParam',
                                useLimit: false
                            })
                        });
                        
                        AmsAuth.util.Authentification.userParamStore.load({
                            callback: function ()
                            {
                               
                            }
                        });
                        
                        */
                        successCallback(json.apiKey);
                        AmsAuth.util.Authentification.fireEvent('authentificationInfoAvailable');
                    } else {
                        failureCallback(AmsLocale.util.Locale.txtAuthErreur, AmsLocale.util.Locale.txtAuthErreurMauvaiseReponse);
                    }
                } else {
                    failureCallback(AmsLocale.util.Locale.txtAuthErreur, AmsLocale.util.Locale.txtAuthErreurMauvaiseReponse);
                }
            },
            failure: function() {
                failureCallback(AmsLocale.util.Locale.txtAuthErreur, AmsLocale.util.Locale.txtAuthErreurMauvaiseLogin);
            }
        });
    },
    setApiKey: function(apiKey) {
        AmsAuth.util.Authentification.apiKey = apiKey;
    },
    setUserNom: function(nom) {
        AmsAuth.util.Authentification.userNom = nom;
    },
    setUserPrenom: function(prenom) {
        AmsAuth.util.Authentification.userPrenom = prenom;
    },
    setUserAvatar: function(avatar) {
        AmsAuth.util.Authentification.userAvatar = avatar;
    },
    setUserLogin: function(login) {
        AmsAuth.util.Authentification.userLogin = login;
    },
    setUserRights: function(userRights) {
        AmsAuth.util.Authentification.userRights = userRights;
        console.log(userRights);
    },
    canConnectToAdmin: function() {
        for (var i = 0; i < AmsAuth.util.Authentification.userRights.Prf.functions.length; i++) {
            var functionRight = AmsAuth.util.Authentification.userRights.Prf.functions[i];
            if (functionRight.functionName === 'connect_to_admin' && functionRight.exec === true) {
                console.log('connexion administration autorisé');
                return true;
            }
        }
        return false;
    },
    canConnectToSig: function() {
        console.log(AmsAuth.util.Authentification.userRights);
        for (var i = 0; i < AmsAuth.util.Authentification.userRights.Sig.functions.length; i++) {
            var functionRight = AmsAuth.util.Authentification.userRights.Sig.functions[i];
            if (functionRight.functionName === 'connect_to_sig' && functionRight.exec === true) {
                console.log('connexion sig autorisé');
                return true;
            }
        }
        return false;
    },
    canEditSigTheme: function() {
        for (var i = 0; i < AmsAuth.util.Authentification.userRights.Sig.functions.length; i++) {
            var functionRight = AmsAuth.util.Authentification.userRights.Sig.functions[i];
            if (functionRight.functionName === 'edit_sig_theme' && functionRight.exec === true) {
                console.log('edition theme sig autorisé');
                return true;
            }
        }
        return false;
    }
});

// @charset UTF8
Ext.define('AmsMain.view.AccountController', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.auth-account',
    init: function() {}
});

// @charset UTF8
Ext.define('AmsAuth.view.Account', {
    extend: 'Ext.window.Window',
    requires: [
        'AmsLocale.util.Locale',
        'AmsMain.view.AccountController',
        'AmsAuth.util.Authentification'
    ],
    controller: 'auth-account',
    xtype: 'ams-auth-account',
    modal: true,
    minWidth: 300,
    minHeight: 300,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        var me = this;
        this.setTitle(AmsLocale.util.Locale.txtTitreCompte);
        var txts = [];
        for (var schemaName in AmsAuth.util.Authentification.userRights) {
            if (AmsAuth.util.Authentification.userRights.hasOwnProperty(schemaName)) {
                var schemaRights = AmsAuth.util.Authentification.userRights[schemaName];
                var txt = Ext.create('Ext.form.field.Text', {
                        readOnly: true,
                        margin: 4,
                        fieldLabel: schemaRights.displayName,
                        value: schemaRights.profil
                    });
                txts.push(txt);
            }
        }
        this.items = [
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'image',
                        width: 64,
                        border: true,
                        height: 64,
                        margin: 4,
                        src: AmsAuth.util.Authentification.userAvatar
                    }
                ]
            },
            {
                xtype: 'textfield',
                readOnly: true,
                margin: 4,
                fieldLabel: AmsLocale.util.Locale.txtNom,
                value: AmsAuth.util.Authentification.userNom
            },
            {
                xtype: 'textfield',
                readOnly: true,
                margin: 4,
                fieldLabel: AmsLocale.util.Locale.txtPrenom,
                value: AmsAuth.util.Authentification.userPrenom
            },
            {
                xtype: 'panel',
                title: 'Profils',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: txts
            }
        ];
        this.callParent(arguments);
    }
});

// @charset UTF8
Ext.define('AmsAuth.view.ToolAccount', {
    requires: [
        'AmsLocale.util.Locale',
        'AmsAuth.view.Account'
    ],
    extend: 'Ext.button.Button',
    xtype: 'ams-tool-account',
    scale: 'medium',
    icon: 'resources/icons/24x24/account.png',
    listeners: {
        click: function() {
            this.showAccountWindow();
        }
    },
    showAccountWindow: function() {
        var window = Ext.create('AmsAuth.view.Account');
        window.show();
    },
    initComponent: function() {
        this.setText(AmsLocale.util.Locale.txtMonCompte);
        this.callParent(arguments);
    }
});

// @charset UTF8
Ext.define('AmsAuth.view.ToolDisconnect', {
    requires: [
        'AmsLocale.util.Locale'
    ],
    extend: 'Ext.button.Button',
    xtype: 'ams-tool-disconnect',
    text: 'Déconnexion',
    scale: 'medium',
    icon: 'resources/icons/24x24/disconnect.png',
    initComponent: function() {
        this.setText(AmsLocale.util.Locale.txtDeconnexion);
        this.callParent(arguments);
    }
});

// @charset UTF8
Ext.define('AmsMain.view.AuthToolbarController', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.auth-toolbar',
    init: function() {
        var me = this;
        AmsAuth.util.Authentification.on('authentificationInfoAvailable', function() {
            me.updateUserInfo.call(me);
        });
    },
    //console.log(AmsAuth.util.Authentification);
    updateUserInfo: function() {
        var lblPrenom = this.lookupReference('lblPrenom');
        var lblNom = this.lookupReference('lblNom');
        var imgAvatar = this.lookupReference('imgAvatar');
        lblPrenom.setText(AmsAuth.util.Authentification.userPrenom);
        lblNom.setText(AmsAuth.util.Authentification.userNom);
        imgAvatar.setSrc(AmsAuth.util.Authentification.userAvatar);
    }
});

// @charset UTF8
Ext.define('AmsAuth.view.AuthToolbar', {
    extend: 'Ext.container.Container',
    requires: [
        'AmsLocale.util.Locale',
        'AmsAuth.view.ToolAccount',
        'AmsAuth.view.ToolDisconnect',
        'AmsLocale.view.locale.ComboLanguage',
        'AmsAuth.util.Authentification',
        'AmsMain.view.AuthToolbarController'
    ],
    controller: 'auth-toolbar',
    xtype: 'ams-auth-toolbar',
    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'end'
    },
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype: 'image',
                width: 64,
                height: 64,
                margin: 4,
                reference: 'imgAvatar'
            },
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'label',
                        reference: 'lblPrenom',
                        cls: 'x-btn-inner-default-medium'
                    },
                    {
                        xtype: 'label',
                        reference: 'lblNom',
                        cls: 'x-btn-inner-default-medium'
                    },
                    {
                        xtype: 'ams-combo-lang',
                        margin: 4
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'ams-tool-account',
                        width: 200,
                        margin: 4
                    },
                    {
                        xtype: 'ams-tool-disconnect',
                        margin: 4,
                        width: 200,
                        listeners: {
                            click: function() {
                                me.fireEvent('disconnectClick');
                            }
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});

// @charset UTF8
Ext.define('AmsMain.view.LoginController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'AmsAuth.util.Authentification',
        'Ext.window.MessageBox',
        'AmsAuth.crypto.Sha1',
        'AmsLocale.util.Locale'
    ],
    alias: 'controller.login',
    onConnectButtonClick: function() {
        var me = this;
        var login = this.getViewModel().get('login');
        var password = this.getViewModel().get('password');
        var sha1Password = AmsAuth.crypto.Sha1.hash(password);
        me.getView().mask(AmsLocale.util.Locale.txtAuthentification + ' ...');
        AmsAuth.util.Authentification.authenticate(login, sha1Password, function(apiKey) {
            me.onAuthenticateSuccess.call(me, apiKey);
        }, function(title, message) {
            me.onAuthenticateFailure.call(me, title, message);
        });
    },
    onAuthenticateSuccess: function(apiKey) {
        this.getView().unmask();
        this.fireViewEvent('loginSuccess');
    },
    onAuthenticateFailure: function(title, message) {
        this.getView().unmask();
        Ext.Msg.alert(title, message);
    }
});

// @charset UTF8
Ext.define('AmsMain.view.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.login',
    data: {
        login: '',
        password: ''
    }
});

// @charset UTF8
Ext.define('AmsAuth.view.Login', {
    extend: 'Ext.panel.Panel',
    requires: [
        'AmsMain.view.LoginController',
        'AmsMain.view.LoginModel',
        'AmsLocale.util.Locale'
    ],
    xtype: 'ams-login',
    controller: 'login',
    viewModel: {
        type: 'login'
    },
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    initComponent: function() {
        this.items = [
            {
                xtype: 'panel',
                title: AmsLocale.util.Locale.txtAuthentification,
                border: true,
                items: [
                    {
                        xtype: 'form',
                        items: [
                            {
                                xtype: 'textfield',
                                reference: 'txtLogin',
                                allowBlank: false,
                                minLength: 2,
                                fieldLabel: AmsLocale.util.Locale.txtLogin,
                                labelWidth: 150,
                                margin: 4,
                                bind: {
                                    value: '{login}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                allowBlank: false,
                                reference: 'txtPassword',
                                fieldLabel: AmsLocale.util.Locale.txtPassword,
                                inputType: 'password',
                                labelWidth: 150,
                                minLength: 2,
                                margin: 4,
                                bind: {
                                    value: '{password}'
                                }
                            }
                        ],
                        buttons: [
                            {
                                text: AmsLocale.util.Locale.txtConnexion,
                                formBind: true,
                                disabled: true,
                                scale: 'medium',
                                icon: 'resources/icons/24x24/connect.png',
                                handler: 'onConnectButtonClick'
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});

