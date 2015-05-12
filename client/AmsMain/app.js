/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'AmsMain',
    requires:[ 
        'AmsData.data.proxy.SecureRestProxy',
        // C'est les schéma déclaré ici qui génére les interface
        'AmsDomainPrf.model.PrfRepository',
        'AmsDomainSig.model.SigRepository',
        'AmsDomainInf.model.InfRepository'
    ],
    extend: 'AmsMain.Application',    
    autoCreateViewport: 'AmsMain.view.main.Main'
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to AmsMain.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
