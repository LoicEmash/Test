// @charset UTF8
Ext.onReady(function(){
    var queryString = window.location.search;
        var params = {};
        if (queryString !== '')
        {

            var queryStringValues = queryString.substring(1).split("&");
            for (var i = 0; i < queryStringValues.length; i++)
            {
                var queryStringValueInfos = queryStringValues[i].split("=");
                
                var key = queryStringValueInfos[0];
                var value = queryStringValueInfos[1];
                params[key] = value;
            }
        }
        if (params.lang === undefined)
        {
            params.lang = 'fr';
        }
      
        var urlExt = Ext.util.Format.format("resources/locale/ext-locale-{0}.js", params.lang);
        Ext.Loader.loadScript({
            url: urlExt,           
            scope: this
        }
        );
        var urlAms = Ext.util.Format.format("resources/locale/ams-locale-{0}.js", params.lang);
        Ext.Loader.loadScript({
            url: urlAms,           
            scope: this
        }
        );
       
        console.log('locale -> '+params.lang);
});

Ext.define('AmsLocale.util.Locale', {
   singleton: true,
   getCurrentLang:function()
   {
        var queryString = window.location.search;
       var params = {};
        if (queryString !== '')
        {

            var queryStringValues = queryString.substring(1).split("&");
            for (var i = 0; i < queryStringValues.length; i++)
            {
                var queryStringValueInfos = queryStringValues[i].split("=");
                
                var key = queryStringValueInfos[0];
                var value = queryStringValueInfos[1];
                params[key] = value;
            }
        }
        if (params.lang === undefined)
        {
            params.lang = 'fr';
        }
        return params.lang ;
   },
   switchLang : function(code)
   {
       if (window.location.toString().indexOf('?') === -1)
       { window.location.href = window.location.toString()+"?lang="+code;}
       else
       { window.location.href = window.location.toString().split('?')[0]+"?lang="+code;}
      
       
   },
   txtOk : "Valider",
   txtCancel : "Annuler",
  
   txtSociete:"Société",
   txtFonction:"Fonction",
   txtService : "Service",
   txtProfil:"Profil",
   txtUtilisateur :"Utilisateur",
   
   txtSocietes:"Sociétés",
   txtFonctions:"Fonctions",
   txtServices : "Services",
   txtProfils:"Profils",
   txtUtilisateurs :"Utilisateurs",
   
   txtLibelle : "Libellé",
   txtAjouterFonction:"Ajouter une fonction",
   txtAjouterService:"Ajouter un service",
   txtAjouterProfil:"Ajouter un profil",
   txtAjouterSociete:"Ajouter une société",
   txtAjouterUtilisateur:"Ajouter un utilisateur",
   
   
   txtDetailFonction:"Détails de la fonction",
   txtDetailService:"Détails du service",
   txtDetailProfil:"Détails du profil",
   txtDetailSociete:"Détails de la société",
   txtDetailUtilisateur:"Détails de l'utilisateur",  
   
   txtAjouter : "Ajouter",
   txtVider : "Vider",
   txtChercher : "Chercher",
   txtModifier : "Modifier",
   txtSupprimer : "Supprimer",
   txtConfiguration : "Configuration",
   
   txtErreur :"Erreur",
   txtDbErreur : "Erreur de base de donnée",
   txtConfirmDelete : "Confirmation de supression",
   questionDeleteFonction : "Etes-vous sur de vouloir supprimer la fonction {0} ?",
  
   txtNewFonction:"Nouvelle fonction",
   txtNewService:"Nouveau service",
   txtNewProfil:"Nouveau profil",
   txtNewSociete:"Nouvelle société",
   txtNewUtilisateur:"Nouvel utilisateur",
   
   txtEditFonction:"Modifier la fonction",
   txtEditService:"Modifier le service",
   txtEditProfil:"Modifier le profil",
   txtEditSociete:"Modifier la société",
   txtEditUtilisateur:"Modifier l'utilisateur",  
   
   txtTitle: "Administration",
   txtSchema:"Schéma",
   txtCode:"Code",
   txtTables: "Tables",
   txtAfficher:"Afficher",
   txtEcrire:"Ecrire",
   txtImporter:"Importer",
   txtExecuter :"Exécuter",
   txtGenre:"Genre",
   txtGenreSysteme:"Système",
   txtGenrePerso:"Personalisé",
   txtOperationInterdite:"Opération interdite",
   txtSupressionProfilSystemeInterdit:"Impossible de supprimer un profil système",
   txtFonctionalites:"Fonctionalitées",
   questionDeleteProfil : "Etes-vous sur de vouloir supprimer le profil {0} ?",   
   questionDeleteService : "Etes-vous sur de vouloir supprimer le service {0} ?",
   questionDeleteSociete : "Etes-vous sur de vouloir supprimer la société {0} ?",
   
   
   txtNom:"Nom",
   txtLogin:"Login",
   txtPrenom:"Prénom",
   txtPassword:"Mot de passe",
   txtFamDec:"Famille de découpage",
   txtCdDec:"Code de découpage",
   questionDeleteUser : "Etes-vous sur de vouloir supprimer l'utilisateur {0} ?",
   txtAuthErreur:"Erreur d\'Authentification",
   txtAuthErreurMauvaiseReponse:'Le serveur d\'authentification à renvoyé une réponse invalide',
   txtAuthErreurMauvaiseLogin:'Les informations d\'authentification sont erronées',
   txtAuthentification:"Authentification",
   txtConnexion:"Connexion",
   txtMonCompte:"Mon compte",
   txtDeconnexion:"Déconnexion",
   txtPret:"Prêt",
   txtChargement:'Chargement',
   txtLang:"Language",
   txtLangFr:"Français",
   txtLangEn:"Anglais",
   
   
   
   txtChargementDonnees:"Chargement des données ...",
   txtMajDonnees:"Synchronisation serveur ...",
   txtTitreCompte:"Compte utilisateur"
});