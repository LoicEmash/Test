// @charset UTF8
/*
 * Modèle repésentant un profil d'un utilisateur
 */
Ext.define('AmsAdmin.model.UserProfil', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idProfil',  type: 'integer'},
        {name: 'idSchema',  type: 'integer'}       
    ]
});