// @charset UTF8
Ext.define('AmsMain.view.AuthToolbarController', {
    extend: 'Ext.app.ViewController',
    requires: [
        
    ],
    alias: 'controller.auth-toolbar',
    init : function()
    {
        var me = this;
        
          AmsAuth.util.Authentification.on('authentificationInfoAvailable', function(){
              me.updateUserInfo.call(me);
             //console.log(AmsAuth.util.Authentification);
         });
    },
    updateUserInfo : function()
    {
        var lblPrenom =  this.lookupReference('lblPrenom');
        var lblNom =  this.lookupReference('lblNom');
        var imgAvatar =  this.lookupReference('imgAvatar');
        lblPrenom.setText(AmsAuth.util.Authentification.userPrenom);
        lblNom.setText(AmsAuth.util.Authentification.userNom);
        imgAvatar.setSrc(AmsAuth.util.Authentification.userAvatar);
        
    }
    
});
