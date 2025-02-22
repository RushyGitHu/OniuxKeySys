#!/bin/bash
set -e

echo "=== Environment ==="
node -v
npm -v
pwd
ls -la

echo "=== Installing Dependencies ==="
npm install

echo "=== Setting up directories ==="
mkdir -p public
cp -r src/* public/ || true
ls -la public/

echo "=== Starting Server ==="
npm start 