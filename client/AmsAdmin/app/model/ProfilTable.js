// @charset UTF8
/*
 * Modèle repésentant les droit d'un profil sur une table
 */
Ext.define('AmsAdmin.model.ProfilTable', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'displayName',  type: 'string'},
        {name: 'tableName',  type: 'string'},
        {name: 'tableId',  type: 'string'},
        {name: 'canShow',  type: 'boolean'},
        {name: 'canWrite',  type: 'boolean'},
        {name: 'canImport',  type: 'boolean'}
    ]
});