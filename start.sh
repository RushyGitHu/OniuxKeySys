#!/bin/bash
set -e

# Print error message and exit
error_exit() {
    echo "Error: $1" >&2
    exit 1
}

echo "=== Environment ==="
node -v || error_exit "Node.js not found"
npm -v || error_exit "npm not found"
pwd
ls -la

echo "=== Installing Dependencies ==="
npm install || error_exit "Failed to install dependencies"

echo "=== Setting up directories ==="
rm -rf public/* || true
mkdir -p public || error_exit "Failed to create public directory"
cp -r src/* public/ || error_exit "Failed to copy files to public directory"
echo "Public directory contents:"
ls -la public/

echo "=== File Permissions ==="
chmod -R 755 public/
chmod 755 server.js

echo "=== Starting Server ==="
node server.js 