// @charset UTF8
Ext.define('AmsAuth.util.Authentification', {
    extend: 'Ext.util.Observable',
    requires: [
        'AmsLocale.util.Locale',
    ],
    singleton: true,
    apiKey: null,
    userNom: null,
    userPrenom: null,
    userLogin: null,
    userAvatar: null,
    userRights: null,
    dataExtent : null,
    userParamStore: null,
    authenticateFromCookies: function (successCallback, failureCallback)
    {
        console.log('authenticateFromCookies');
        var login = Ext.util.Cookies.get('userLogin');
        var sha1Password = Ext.util.Cookies.get('userPass');
        if (login !== null && sha1Password !== null)
        {
            console.log('authenticateFromCookies : ' + login + " " + sha1Password);
            this.authenticate(login, sha1Password, successCallback, failureCallback);
        }
        else
        {
            failureCallback();
        }
    },
    authenticate: function (login, sha1Password, successCallback, failureCallback)
    {
        Ext.Ajax.request({
            url: '../../serveur/web/app_dev.php/Authenticate/' + login + '/' + sha1Password,
            success: function (response) {
                var json = Ext.JSON.decode(response.responseText, true);
                if (json !== null)
                {
                    if (json.apiKey !== undefined && json.apiKey !== null)
                    {
                        
                        AmsAuth.util.Authentification.setApiKey(json.apiKey);
                        AmsAuth.util.Authentification.setUserNom(json.nom);
                        AmsAuth.util.Authentification.setUserPrenom(json.prenom);
                        AmsAuth.util.Authentification.setUserAvatar(json.avatar);
                        AmsAuth.util.Authentification.setUserLogin(json.login);
                        AmsAuth.util.Authentification.setUserRights(json.rights);   
                    
                        AmsAuth.util.Authentification.setDataExtent(json.dataExtend);
                        
                        var now = new Date();
                        var expiry = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
                        Ext.util.Cookies.set('userLogin', login, expiry);
                        Ext.util.Cookies.set('userPass', sha1Password, expiry);
                       
                        successCallback(json.apiKey);
                        AmsAuth.util.Authentification.fireEvent('authentificationInfoAvailable');


                    }
                    else
                    {
                        failureCallback(AmsLocale.util.Locale.txtAuthErreur, AmsLocale.util.Locale.txtAuthErreurMauvaiseReponse);
                    }
                }
                else
                {
                    failureCallback(AmsLocale.util.Locale.txtAuthErreur, AmsLocale.util.Locale.txtAuthErreurMauvaiseReponse);
                }
            },
            failure: function () {
                failureCallback(AmsLocale.util.Locale.txtAuthErreur, AmsLocale.util.Locale.txtAuthErreurMauvaiseLogin);
            }
        });
    },
    setApiKey: function (apiKey)
    {
        AmsAuth.util.Authentification.apiKey = apiKey;
    },
    setUserNom: function (nom)
    {
        AmsAuth.util.Authentification.userNom = nom;
    },
    setUserPrenom: function (prenom)
    {
        AmsAuth.util.Authentification.userPrenom = prenom;
    },
    setUserAvatar: function (avatar)
    {
        AmsAuth.util.Authentification.userAvatar = avatar;
    },
    setUserLogin: function (login)
    {
        AmsAuth.util.Authentification.userLogin = login;
    },
    setDataExtent : function(dataExtent)
    {
         AmsAuth.util.Authentification.dataExtent = dataExtent;       
    },
    setUserRights: function (userRights)
    {
        AmsAuth.util.Authentification.userRights = userRights;       
    },
    canImportTable: function (tableName)
    {
        var result = false;
        for (var schemaName in AmsAuth.util.Authentification.userRights) {
            if (AmsAuth.util.Authentification.userRights.hasOwnProperty(schemaName)) {
                var schemaRight = AmsAuth.util.Authentification.userRights[schemaName];

                for (var i = 0; i < schemaRight.tables.length; i++)
                {
                    var tableRight = schemaRight.tables[i];
                   if (tableRight.tableName.toLowerCase() === tableName.toLowerCase())
                    {
                        result = tableRight.allowImport;
                    }
                }
            }
        }
        return result;
    },
     canWriteTable: function (tableName)
    {
        console.log('check canWriteTable '+tableName);
        var result = false;
        for (var schemaName in AmsAuth.util.Authentification.userRights) {
            if (AmsAuth.util.Authentification.userRights.hasOwnProperty(schemaName)) {
                var schemaRight = AmsAuth.util.Authentification.userRights[schemaName];
                
                for (var i = 0; i < schemaRight.tables.length; i++)
                {
                    var tableRight = schemaRight.tables[i];
                    
                    if (tableRight.tableName.toLowerCase() === tableName.toLowerCase())
                    {
                       
                        result = tableRight.allowWrite;
                    }
                }
            }
        }
        return result;
    }
    ,
     canShowTable: function (tableName)
    {
        var result = false;
        for (var schemaName in AmsAuth.util.Authentification.userRights) {
            if (AmsAuth.util.Authentification.userRights.hasOwnProperty(schemaName)) {
                var schemaRight = AmsAuth.util.Authentification.userRights[schemaName];

                for (var i = 0; i < schemaRight.tables.length; i++)
                {
                    var tableRight = schemaRight.tables[i];
                    if (tableRight.tableName.toLowerCase() === tableName.toLowerCase())
                    {
                        result = tableRight.allowShow;
                    }
                }
            }
        }
        return result;
    },
    canConnectToAdmin: function ()
    {
        for (var i = 0; i < AmsAuth.util.Authentification.userRights.Prf.functions.length; i++)
        {
            var functionRight = AmsAuth.util.Authentification.userRights.Prf.functions[i];
            if (functionRight.functionName === 'connect_to_admin' && functionRight.exec === true)
            {
                console.log('connexion administration autorisé');
                return true;
            }
        }
        return false;
    },
    canConnectToSig: function ()
    {
        console.log(AmsAuth.util.Authentification.userRights);
        for (var i = 0; i < AmsAuth.util.Authentification.userRights.Sig.functions.length; i++)
        {
            var functionRight = AmsAuth.util.Authentification.userRights.Sig.functions[i];
            if (functionRight.functionName === 'connect_to_sig' && functionRight.exec === true)
            {
                console.log('connexion sig autorisé');
                return true;
            }
        }
        return false;
    },
    canEditSigTheme: function ()
    {
        for (var i = 0; i < AmsAuth.util.Authentification.userRights.Sig.functions.length; i++)
        {
            var functionRight = AmsAuth.util.Authentification.userRights.Sig.functions[i];
            if (functionRight.functionName === 'edit_sig_theme' && functionRight.exec === true)
            {
                console.log('edition theme sig autorisé');
                return true;
            }
        }
        return false;
    }

});
