cd ./client
grunt
cd ..
rm -Rf ./server/public/scripts
rm -Rf ./server/public/styles
rm -Rf /var/www/frontend-prototype/dist/*
cp ./client/dist/* ./server/public -Rf
cp ./client/dist/* /var/www/frontend-prototype/dist -Rf
