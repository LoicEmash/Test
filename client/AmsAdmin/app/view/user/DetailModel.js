Ext.define('AmsAdmin.view.user.DetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user-detail',
    requires:[
        'AmsAuth.crypto.Sha1'
    ],
    data: {
        nom: '',
        prenom: '',
        login: '',
        password: '',
        fonctionId: null,
        serviceId: null,
        societeId: null,
        photo : null,
    },
    setRecord: function (userRecord)
    {
        this.set('nom', userRecord.get('nom'));
        this.set('prenom', userRecord.get('prenom'));
        this.set('login', userRecord.get('login'));      
        this.set('photo', userRecord.get('avatar'));
        var idFonction = userRecord.get('prfPtfoId');
        var idSociete = null;
        var idService = null;
        var fonctionStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Fonction');
        var fonctionRec = fonctionStore.findRecord('id', idFonction);
        if (fonctionRec !== null)
        {
            idService = fonctionRec.get('prfSvcId');
            var serviceStore = Ext.data.StoreManager.lookup('AmsAdmin.store.Service');
            var serviceRec = serviceStore.findRecord('id', idService);
            if (serviceRec !== null)
            {
                idSociete = serviceRec.get('prfSteId');
            }
        }

        this.set('fonctionId', idFonction);
        this.set('serviceId', idService);
        this.set('societeId', idSociete);


    },
    fillRecord : function(record,withPassword)
    {
        record.set('nom',this.get('nom'));
        record.set('prenom',this.get('prenom'));
        record.set('login',this.get('login'));
        
        record.set('avatar',this.get('photo'));
       // console.log('set avatar ->' +this.get('photo') );
        if (withPassword === true)
        {            
            var sha1Pass= AmsAuth.crypto.Sha1.hash(this.get('password'));
            record.set('pass',sha1Pass);
        }        
        record.set('prfPtfoId',this.get('fonctionId'));
    }

});
