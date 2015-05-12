// @charset UTF8
Ext.onReady(function() {
    var queryString = window.location.search;
    var params = {};
    if (queryString !== '') {
        var queryStringValues = queryString.substring(1).split("&");
        for (var i = 0; i < queryStringValues.length; i++) {
            var queryStringValueInfos = queryStringValues[i].split("=");
            var key = queryStringValueInfos[0];
            var value = queryStringValueInfos[1];
            params[key] = value;
        }
    }
    if (params.lang === undefined) {
        params.lang = 'fr';
    }
    var urlExt = Ext.util.Format.format("resources/locale/ext-locale-{0}.js", params.lang);
    Ext.Loader.loadScript({
        url: urlExt,
        scope: this
    });
    var urlAms = Ext.util.Format.format("resources/locale/ams-locale-{0}.js", params.lang);
    Ext.Loader.loadScript({
        url: urlAms,
        scope: this
    });
    console.log('locale -> ' + params.lang);
});
Ext.define('AmsLocale.util.Locale', {
    singleton: true,
    getCurrentLang: function() {
        var queryString = window.location.search;
        var params = {};
        if (queryString !== '') {
            var queryStringValues = queryString.substring(1).split("&");
            for (var i = 0; i < queryStringValues.length; i++) {
                var queryStringValueInfos = queryStringValues[i].split("=");
                var key = queryStringValueInfos[0];
                var value = queryStringValueInfos[1];
                params[key] = value;
            }
        }
        if (params.lang === undefined) {
            params.lang = 'fr';
        }
        return params.lang;
    },
    switchLang: function(code) {
        if (window.location.toString().indexOf('?') === -1) {
            window.location.href = window.location.toString() + "?lang=" + code;
        } else {
            window.location.href = window.location.toString().split('?')[0] + "?lang=" + code;
        }
    },
    txtOk: "Valider",
    txtCancel: "Annuler",
    txtSociete: "Soci�t�",
    txtFonction: "Fonction",
    txtService: "Service",
    txtProfil: "Profil",
    txtUtilisateur: "Utilisateur",
    txtSocietes: "Soci�t�s",
    txtFonctions: "Fonctions",
    txtServices: "Services",
    txtProfils: "Profils",
    txtUtilisateurs: "Utilisateurs",
    txtLibelle: "Libell�",
    txtAjouterFonction: "Ajouter une fonction",
    txtAjouterService: "Ajouter un service",
    txtAjouterProfil: "Ajouter un profil",
    txtAjouterSociete: "Ajouter une soci�t�",
    txtAjouterUtilisateur: "Ajouter un utilisateur",
    txtDetailFonction: "D�tails de la fonction",
    txtDetailService: "D�tails du service",
    txtDetailProfil: "D�tails du profil",
    txtDetailSociete: "D�tails de la soci�t�",
    txtDetailUtilisateur: "D�tails de l'utilisateur",
    txtModifier: "Modifier",
    txtSupprimer: "Supprimer",
    txtConfiguration: "Configuration",
    txtErreur: "Erreur",
    txtDbErreur: "Erreur de base de donn�e",
    txtConfirmDelete: "Confirmation de supression",
    questionDeleteFonction: "Etes-vous sur de vouloir supprimer la fonction {0} ?",
    txtNewFonction: "Nouvelle fonction",
    txtNewService: "Nouveau service",
    txtNewProfil: "Nouveau profil",
    txtNewSociete: "Nouvelle soci�t�",
    txtNewUtilisateur: "Nouvel utilisateur",
    txtEditFonction: "Modifier la fonction",
    txtEditService: "Modifier le service",
    txtEditProfil: "Modifier le profil",
    txtEditSociete: "Modifier la soci�t�",
    txtEditUtilisateur: "Modifier l'utilisateur",
    txtTitle: "Administration",
    txtSchema: "Sch�ma",
    txtCode: "Code",
    txtTables: "Tables",
    txtAfficher: "Afficher",
    txtEcrire: "Ecrire",
    txtImporter: "Importer",
    txtExecuter: "Ex�cuter",
    txtGenre: "Genre",
    txtGenreSysteme: "Syst�me",
    txtGenrePerso: "Personalis�",
    txtOperationInterdite: "Op�ration interdite",
    txtSupressionProfilSystemeInterdit: "Impossible de supprimer un profil syst�me",
    txtFonctionalites: "Fonctionalit�es",
    questionDeleteProfil: "Etes-vous sur de vouloir supprimer le profil {0} ?",
    questionDeleteService: "Etes-vous sur de vouloir supprimer le service {0} ?",
    questionDeleteSociete: "Etes-vous sur de vouloir supprimer la soci�t� {0} ?",
    txtNom: "Nom",
    txtLogin: "Login",
    txtPrenom: "Pr�nom",
    txtPassword: "Mot de passe",
    txtFamDec: "Famille de d�coupage",
    txtCdDec: "Code de d�coupage",
    questionDeleteUser: "Etes-vous sur de vouloir supprimer l'utilisateur {0} ?",
    txtAuthErreur: "Erreur d'Authentification",
    txtAuthErreurMauvaiseReponse: 'Le serveur d\'authentification � renvoy� une r�ponse invalide',
    txtAuthErreurMauvaiseLogin: 'Les informations d\'authentification sont erron�es',
    txtAuthentification: "Authentification",
    txtConnexion: "Connexion",
    txtMonCompte: "Mon compte",
    txtDeconnexion: "D�connexion",
    txtPret: "Pr�t",
    txtChargement: 'Chargement',
    txtLang: "Language",
    txtLangFr: "Fran�ais",
    txtLangEn: "Anglais",
    txtChargementDonnees: "Chargement des donn�es ...",
    txtMajDonnees: "Synchronisation serveur ...",
    txtTitreCompte: "Compte utilisateur"
});

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
    watchChange: true,
    listeners: {
        change: function(cb, newValue, oldValue, eOpts) {
            if (this.watchChange === true) {
                AmsLocale.util.Locale.switchLang(newValue);
            }
        },
        afterrender: function() {
            this.watchChange = false;
            var currentLang = AmsLocale.util.Locale.getCurrentLang();
            console.log(currentLang);
            this.setValue(currentLang);
            this.watchChange = true;
        }
    },
    initComponent: function() {
        this.setStore(Ext.create('Ext.data.Store', {
            fields: [
                'code',
                'libelle'
            ],
            data: [
                {
                    "code": "fr",
                    "libelle": AmsLocale.util.Locale.txtLangFr
                },
                {
                    "code": "en",
                    "libelle": AmsLocale.util.Locale.txtLangEn
                }
            ]
        }));
        //this.setValue(AmsLocale.util.Locale.currentLang);
        //this.setFieldLabel(AmsLocale.util.Locale.txtLang);
        // this.setValue(currentLang);
        this.callParent(arguments);
    }
});

