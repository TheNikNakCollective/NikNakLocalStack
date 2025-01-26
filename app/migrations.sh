#!/bin/sh
set -e

cd /usr/src/NikNakLocalStack/app

echo "Running Migrations..."
yarn build:datasource

cd /usr/src/NikNakLocalStack/app/server

yarn migration:generate || true
yarn migration:run || true