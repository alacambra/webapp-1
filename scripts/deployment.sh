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
echo $deployment_folder

cd $deployment_folder/webapp
git checkout $deployment_branch
git pull
cd $deployment_folder/webapp/client/js
cp ./config.example.js ./config.js
cat ./config.js
grunt build
cp -Rf $deployment_folder/webapp/client/dist/* $deployment_folder/webapp/server/webapplication/src/main/webapp/
cd $deployment_folder/webapp/server/webapplication/
mvn clean package glassfish:redeploy -P dep
git reset --hard HEAD
