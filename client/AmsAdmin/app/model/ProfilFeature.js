// @charset UTF8
/*
 * Modèle repésentant un droit d'un profil sur un fonctionalitées
 */
Ext.define('AmsAdmin.model.ProfilFeature', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'featureName',  type: 'string'},
        {name: 'featureId',  type: 'string'},
        {name: 'canExec',  type: 'boolean'}
    ]
});