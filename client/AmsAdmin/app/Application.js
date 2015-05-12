/*
 * Point d'entré de l'application, 
 * Le Panel principal (Viewport) se crée tout seul.
 * Voir la vue Main pour plus d'infos
 */
Ext.define('AmsAdmin.Application', {
    extend: 'Ext.app.Application',
    requires: [
        'AmsData.data.proxy.SecureRestProxy',
        'Ext.grid.*',
        'Ext.form.field.*'
    ],
    name: 'AmsAdmin',
    /*
     * Liste des stores globaux
     */
    stores: [
        'AmsAdmin.store.Societe',
        'AmsAdmin.store.Service',
        'AmsAdmin.store.Fonction',
        'AmsAdmin.store.User',
        'AmsAdmin.store.Schema',
        'AmsAdmin.store.Profil',
        'AmsAdmin.store.Table',
        'AmsAdmin.store.Feature',
        'AmsAdmin.store.ProfilTable',
        'AmsAdmin.store.ProfilFeature',
        'AmsAdmin.store.UserProfil',
        'AmsAdmin.store.Param'
                // TODO: add global / shared stores here
    ],
    launch: function () {
        

        // TODO - Launch the application
    }
});
