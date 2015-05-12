Ext.define('AmsAdmin.view.profil.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.profil-detail',
    requires: [
        'AmsAdmin.model.ProfilTable',
        'AmsAdmin.model.ProfilFeature'
    ],
    data: {
        schemaId: null,
        code: null,
        libelle: null
    },
   
    setRecord: function (profilRecord)
    {
        this.set('libelle', profilRecord.get('lib'));
        this.set('code', profilRecord.get('profil'));
        this.set('schemaId', profilRecord.get('prfSchId'));
    },
    fillRecord: function (profilRecord)
    {
        profilRecord.set('lib', this.get('libelle'));
        profilRecord.set('profil', this.get('code'));
        profilRecord.set('prfSchId', this.get('schemaId'));

    }

});
