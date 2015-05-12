Ext.define('AmsDomainPrf.model.PrfBase', {
    requires: [
        'Ext.data.Model'
    ],
    extend: 'Ext.data.Model',
    schema: {
        namespace: 'AmsDomainPrf.model',
        id: 'Prf',
        models: [
            'AmsDomainPrf.model.PrfAppli',
            'AmsDomainPrf.model.PrfFct',
            'AmsDomainPrf.model.PrfFctDroi',
            'AmsDomainPrf.model.PrfParam',
            'AmsDomainPrf.model.PrfProf',
            'AmsDomainPrf.model.PrfProfUser',
            'AmsDomainPrf.model.PrfPtfo',
            'AmsDomainPrf.model.PrfSch',
            'AmsDomainPrf.model.PrfSte',
            'AmsDomainPrf.model.PrfSvc',
            'AmsDomainPrf.model.PrfTabl',
            'AmsDomainPrf.model.PrfTablDroi',
            'AmsDomainPrf.model.PrfUser',
            'AmsDomainPrf.model.PrfUsrParam'
        ]
    }
});

Ext.define('AmsDomainPrf.model.PrfAppli', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfAppli',
        schema: 'Prf'
    }),
    tableDisplayName: 'application',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: true
        },
        {
            name: 'code',
            type: 'string',
            allowNull: true
        },
        {
            name: 'cle',
            type: 'string',
            allowNull: true
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfSch', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfSch',
        schema: 'Prf'
    }),
    tableDisplayName: 'schéma ams',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'schema',
            type: 'string',
            allowNull: false
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfFct', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfSch'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfFct',
        schema: 'Prf'
    }),
    tableDisplayName: 'fonction par schéma',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfSchId',
            type: 'int',
            allowNull: false,
            reference: 'PrfSch'
        },
        {
            name: 'cod',
            type: 'string',
            allowNull: false
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: true
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfProf', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfSch'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfProf',
        schema: 'Prf'
    }),
    tableDisplayName: 'profil',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfSchId',
            type: 'int',
            allowNull: false,
            reference: 'PrfSch'
        },
        {
            name: 'profil',
            type: 'string',
            allowNull: false
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: false
        },
        {
            name: 'genre',
            type: 'int',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfFctDroi', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfProf',
        'AmsDomainPrf.model.PrfFct'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfFctDroi',
        schema: 'Prf'
    }),
    tableDisplayName: 'droits sur les fonctions',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfProfId',
            type: 'int',
            allowNull: false,
            reference: 'PrfProf'
        },
        {
            name: 'prfFctId',
            type: 'int',
            allowNull: false,
            reference: 'PrfFct'
        },
        {
            name: 'exec',
            type: 'boolean',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfParam', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfParam',
        schema: 'Prf'
    }),
    tableDisplayName: 'paramètres',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'sch',
            type: 'string',
            allowNull: true
        },
        {
            name: 'code',
            type: 'string',
            allowNull: false
        },
        {
            name: 'valeur',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfSte', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfSte',
        schema: 'Prf'
    }),
    tableDisplayName: 'société',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfSvc', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfSte'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfSvc',
        schema: 'Prf'
    }),
    tableDisplayName: 'service administratif',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfSteId',
            type: 'int',
            allowNull: false,
            reference: 'PrfSte'
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfPtfo', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfSvc'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfPtfo',
        schema: 'Prf'
    }),
    tableDisplayName: 'poste_fonctions',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfSvcId',
            type: 'int',
            allowNull: false,
            reference: 'PrfSvc'
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfUser', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfPtfo'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfUser',
        schema: 'Prf'
    }),
    tableDisplayName: 'utilisateur',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfPtfoId',
            type: 'int',
            allowNull: false,
            reference: 'PrfPtfo'
        },
        {
            name: 'login',
            type: 'string',
            allowNull: false
        },
        {
            name: 'pass',
            type: 'string',
            allowNull: false
        },
        {
            name: 'nom',
            type: 'string',
            allowNull: false
        },
        {
            name: 'prenom',
            type: 'string',
            allowNull: true
        },
        {
            name: 'infFamDec',
            type: 'string',
            allowNull: true
        },
        {
            name: 'infCdDec',
            type: 'string',
            allowNull: true
        },
        {
            name: 'avatar',
            type: 'string',
            allowNull: true
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfProfUser', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfProf',
        'AmsDomainPrf.model.PrfUser'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfProfUser',
        schema: 'Prf'
    }),
    tableDisplayName: 'profils utilisateurs',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfProfId',
            type: 'int',
            allowNull: false,
            reference: 'PrfProf'
        },
        {
            name: 'prfUserId',
            type: 'int',
            allowNull: false,
            reference: 'PrfUser'
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfTabl', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfSch'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfTabl',
        schema: 'Prf'
    }),
    tableDisplayName: 'table par schéma',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfSchId',
            type: 'int',
            allowNull: false,
            reference: 'PrfSch'
        },
        {
            name: 'code',
            type: 'string',
            allowNull: false
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfTablDroi', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainPrf.model.PrfTabl',
        'AmsDomainPrf.model.PrfProf'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfTablDroi',
        schema: 'Prf'
    }),
    tableDisplayName: 'droits sur les tables',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'prfTablId',
            type: 'int',
            allowNull: false,
            reference: 'PrfTabl'
        },
        {
            name: 'prfProfId',
            type: 'int',
            allowNull: false,
            reference: 'PrfProf'
        },
        {
            name: 'show',
            type: 'boolean',
            allowNull: false
        },
        {
            name: 'import',
            type: 'boolean',
            allowNull: false
        },
        {
            name: 'write',
            type: 'boolean',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfUsrParam', {
    extend: 'AmsDomainPrf.model.PrfBase',
    requires: [
        'AmsDomainPrf.model.PrfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'PrfUsrParam',
        schema: 'Prf'
    }),
    tableDisplayName: 'paramètres utilisateur',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'login',
            type: 'string',
            allowNull: false
        },
        {
            name: 'sch',
            type: 'string',
            allowNull: true
        },
        {
            name: 'code',
            type: 'string',
            allowNull: false
        },
        {
            name: 'val',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainPrf.model.PrfRepository', {
    singleton: true,
    requires: [
        'AmsDomainPrf.model.PrfAppli',
        'AmsDomainPrf.model.PrfFct',
        'AmsDomainPrf.model.PrfFctDroi',
        'AmsDomainPrf.model.PrfParam',
        'AmsDomainPrf.model.PrfProf',
        'AmsDomainPrf.model.PrfProfUser',
        'AmsDomainPrf.model.PrfPtfo',
        'AmsDomainPrf.model.PrfSch',
        'AmsDomainPrf.model.PrfSte',
        'AmsDomainPrf.model.PrfSvc',
        'AmsDomainPrf.model.PrfTabl',
        'AmsDomainPrf.model.PrfTablDroi',
        'AmsDomainPrf.model.PrfUser',
        'AmsDomainPrf.model.PrfUsrParam'
    ]
});

