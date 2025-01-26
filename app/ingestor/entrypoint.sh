#!/bin/sh
set -e

cd /usr/src/NikNakLocalStack/app

echo "Building Datasource..."
yarn build:datasource

cd /usr/src/NikNakLocalStack/app/ingestor

yarn dev