#!/bin/sh
set -e

echo "Installing NikNakPackages"
cd /usr/src/NikNakPackages
yarn install

echo "Installing NikNakLocalStack"
cd /usr/src/NikNakLocalStack/app/ingestor
yarn install

yarn dev