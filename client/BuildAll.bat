cd packages

cd ams-locale
sencha package build
cd ..

cd ams-ui
sencha package build
cd ..


cd ams-auth
sencha package build
cd ..

cd ams-data
sencha package build
cd ..

cd ams-domain-prf
sencha package build
cd ..

cd ams-domain-sig
sencha package build
cd ..

cd ams-domain-inf
sencha package build
cd ..


cd ..
cd AmsMain
sencha app build

cd ..
cd AmsAdmin
sencha app build

pause