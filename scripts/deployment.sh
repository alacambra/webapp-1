#!/bin/bash

deployment_branch="develop"
base_path=$1
deployment_folder=$base_path/deployments

if [ $# != 1 ]; then
    echo "exactly 4 arguments needed"
    exit 1
fi

echo $deployment_branch
echo $base_path

cd $deployment_folder/webapp
git checkout $deployment_branch
git pull
cd $deployment_folder/webapp/client/
cp js/config.example.js js/config.js
grunt build
rm js/config.js
cp -Rf $base_path/webapp/server/ $deployment_folder
cp -Rf $base_path/webapp/client/dist/* $deployment_folder/server/webapplication/src/main/webapp/

cd $deployment_folder/server/webapplication/
mvn clean package -P dep
mvn glassfish:redeploy -P dep

