#!/bin/bash

# install node
curl --silent --location https://rpm.nodesource.com/setup_16.x | bash -;

# install yarn
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo;
yum -y install yarn;

# install node_modules with yarn
app="$(/opt/elasticbeanstalk/bin/get-config container -k app_staging_dir)";
cd "${app}";
echo "Inside ${app}, about to run yarn."
yarn install;