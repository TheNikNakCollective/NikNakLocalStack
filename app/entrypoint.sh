#!/bin/sh
set -e

echo "Installing NikNakPackages"
cd /usr/src/NikNakPackages
yarn install

echo "Installing NikNakLocalStack"
cd /usr/src/NikNakLocalStack/app/server
yarn install

echo "Running Migrations"
yarn migration:run