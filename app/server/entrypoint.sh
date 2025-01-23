#!/bin/sh
set -e

echo "Installing NikNakPackages"
cd /usr/src/NikNakPackages
yarn install

echo "Installing NikNakLocalStack"
cd /usr/src/NikNakLocalStack/app
yarn install

echo "Building Datasource"
yarn build:datasource

echo "Running Migrations"
cd /usr/src/NikNakLocalStack/app/server
yarn migration:run

yarn dev