#!/bin/bash
cd  /home/alacambra/webapp
git pull origin deployment-testing
git checkout deployment-testing 
cp -Rf /home/alacambra/webapp/server/ /home/alacambra/deployment/
cp -Rf /home/alacambra/webapp/client/* /home/alacambra/deployment/server/webapplication/src/main/webapp/
cd /home/alacambra/deployment/server/webapplication/
mvn clean package -P dep
mvn glassfish:redeploy -P dep
