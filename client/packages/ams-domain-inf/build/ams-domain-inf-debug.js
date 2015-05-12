Ext.define('AmsDomainInf.model.InfBase', {
    requires: [
        'Ext.data.Model'
    ],
    extend: 'Ext.data.Model',
    schema: {
        namespace: 'AmsDomainInf.model',
        id: 'Inf',
        models: [
            'AmsDomainInf.model.InfCdDec',
            'AmsDomainInf.model.InfCdTpc',
            'AmsDomainInf.model.InfChaussee',
            'AmsDomainInf.model.InfFamDec',
            'AmsDomainInf.model.InfLiaison',
            'AmsDomainInf.model.InfSens',
            'AmsDomainInf.model.InfTpc',
            'AmsDomainInf.model.InfTrDec'
        ]
    }
});

Ext.define('AmsDomainInf.model.InfFamDec', {
    extend: 'AmsDomainInf.model.InfBase',
    requires: [
        'AmsDomainInf.model.InfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'InfFamDec',
        schema: 'Inf'
    }),
    tableDisplayName: 'famille de découpage',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'code',
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

Ext.define('AmsDomainInf.model.InfCdDec', {
    extend: 'AmsDomainInf.model.InfBase',
    requires: [
        'AmsDomainInf.model.InfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainInf.model.InfFamDec'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'InfCdDec',
        schema: 'Inf'
    }),
    tableDisplayName: 'code découpages',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'infFamDecId',
            type: 'int',
            allowNull: false,
            reference: 'InfFamDec'
        },
        {
            name: 'code',
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

Ext.define('AmsDomainInf.model.InfCdTpc', {
    extend: 'AmsDomainInf.model.InfBase',
    requires: [
        'AmsDomainInf.model.InfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'InfCdTpc',
        schema: 'Inf'
    }),
    tableDisplayName: 'type de tpc',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'code',
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

Ext.define('AmsDomainInf.model.InfLiaison', {
    extend: 'AmsDomainInf.model.InfBase',
    requires: [
        'AmsDomainInf.model.InfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'InfLiaison',
        schema: 'Inf'
    }),
    tableDisplayName: 'liaison',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'code',
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

Ext.define('AmsDomainInf.model.InfSens', {
    extend: 'AmsDomainInf.model.InfBase',
    requires: [
        'AmsDomainInf.model.InfBase',
        'AmsData.data.proxy.SecureRestProxy'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'InfSens',
        schema: 'Inf'
    }),
    tableDisplayName: 'sens',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'code',
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

Ext.define('AmsDomainInf.model.InfChaussee', {
    extend: 'AmsDomainInf.model.InfBase',
    requires: [
        'AmsDomainInf.model.InfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainInf.model.InfLiaison',
        'AmsDomainInf.model.InfSens'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'InfChaussee',
        schema: 'Inf'
    }),
    tableDisplayName: 'chaussée',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'infLiaisonId',
            type: 'int',
            allowNull: false,
            reference: 'InfLiaison'
        },
        {
            name: 'infSensId',
            type: 'int',
            allowNull: false,
            reference: 'InfSens'
        },
        {
            name: 'lib',
            type: 'string',
            allowNull: true
        },
        {
            name: 'ten',
            type: 'string',
            allowNull: true
        },
        {
            name: 'abo',
            type: 'string',
            allowNull: true
        },
        {
            name: 'deb',
            type: 'string',
            allowNull: false
        },
        {
            name: 'fin',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainInf.model.InfTpc', {
    extend: 'AmsDomainInf.model.InfBase',
    requires: [
        'AmsDomainInf.model.InfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainInf.model.InfChaussee',
        'AmsDomainInf.model.InfCdTpc'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'InfTpc',
        schema: 'Inf'
    }),
    tableDisplayName: 'tpc',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'infChausseeId',
            type: 'int',
            allowNull: false,
            reference: 'InfChaussee'
        },
        {
            name: 'infCdTpcId',
            type: 'int',
            allowNull: false,
            reference: 'InfCdTpc'
        },
        {
            name: 'deb',
            type: 'string',
            allowNull: false
        },
        {
            name: 'fin',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainInf.model.InfTrDec', {
    extend: 'AmsDomainInf.model.InfBase',
    requires: [
        'AmsDomainInf.model.InfBase',
        'AmsData.data.proxy.SecureRestProxy',
        'AmsDomainInf.model.InfCdDec',
        'AmsDomainInf.model.InfChaussee'
    ],
    proxy: Ext.create('AmsData.data.proxy.SecureRestProxy', {
        table: 'InfTrDec',
        schema: 'Inf'
    }),
    tableDisplayName: 'tronçons de découpage',
    fields: [
        {
            name: 'id',
            type: 'int',
            allowNull: false
        },
        {
            name: 'infCdDecId',
            type: 'int',
            allowNull: false,
            reference: 'InfCdDec'
        },
        {
            name: 'infChausseeId',
            type: 'int',
            allowNull: false,
            reference: 'InfChaussee'
        },
        {
            name: 'deb',
            type: 'string',
            allowNull: false
        },
        {
            name: 'fin',
            type: 'string',
            allowNull: false
        }
    ]
});

Ext.define('AmsDomainInf.model.InfRepository', {
    singleton: true,
    requires: [
        'AmsDomainInf.model.InfCdDec',
        'AmsDomainInf.model.InfCdTpc',
        'AmsDomainInf.model.InfChaussee',
        'AmsDomainInf.model.InfFamDec',
        'AmsDomainInf.model.InfLiaison',
        'AmsDomainInf.model.InfSens',
        'AmsDomainInf.model.InfTpc',
        'AmsDomainInf.model.InfTrDec'
    ]
});

