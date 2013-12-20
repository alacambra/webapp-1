#!/bin/bash

client_tag=$1
server_tag=$2
deployment_branch=$3
base_path=$4
deployment_folder=$base_path/deployment

if [ $# != 4 ]; then
    echo "exactly 4 arguments needed"
    exit 1
fi

echo $client_tag
echo $server_tag
echo $deployment_branch
echo $base_path

cd  $base_path/webapp

git branch $deployment_branch
git checkout $deployment_branch
git merge $client_tag
git merge $server_tag

cp -Rf $base_path/webapp/server/ $deployment_folder
cp -Rf $base_path/webapp/client/* $deployment_folder/server/webapplication/src/main/webapp/

cd $deployment_folder/server/webapplication/
mvn clean package -P dep
mvn glassfish:redeploy -P dep
