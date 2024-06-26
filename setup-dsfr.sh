#!/bin/bash

# This script is a cross platform custom installation of dsfr assets to avoid including them in webpack build for performance reasons.

echo "Copying DSFR assets..."

# Ensure TO is set or default to "public/dsfr"

if [ -z "$TO" ]; then
  TO="public/dsfr"
fi

# Determine the package directory based on the current working directory
PACKAGE_DIR=$(pwd)
FROM="$PACKAGE_DIR/node_modules/@gouvfr/dsfr/dist"
TO="$PACKAGE_DIR/$TO"

# Determine the actual source directory
if [ ! -d "$FROM" ]; then
  FROM="$PACKAGE_DIR/../../node_modules/@gouvfr/dsfr/dist"
fi

# Create necessary directories
mkdir -p "$TO/utility"
mkdir -p "$TO/icons"
mkdir -p "$TO/artwork"
mkdir -p "$TO/fonts"

# Copy files
cp "$FROM/dsfr.module.min.js" "$TO/" || { echo "Failed to copy dsfr.module.min.js"; exit 1; }
cp "$FROM/dsfr.module.min.js.map" "$TO/" || { echo "Failed to copy dsfr.module.min.js.map"; exit 1; }
cp "$FROM/dsfr.nomodule.min.js" "$TO/" || { echo "Failed to copy dsfr.nomodule.min.js"; exit 1; }
cp "$FROM/dsfr.nomodule.min.js.map" "$TO/" || { echo "Failed to copy dsfr.nomodule.min.js.map"; exit 1; }
cp "$FROM/dsfr.min.css" "$TO/" || { echo "Failed to copy dsfr.min.css"; exit 1; }
cp "$FROM/utility/utility.min.css" "$TO/utility/" || { echo "Failed to copy utility.min.css"; exit 1; }
cp -R "$FROM/icons/." "$TO/icons/" || { echo "Failed to copy icons"; exit 1; }
cp -R "$FROM/artwork/." "$TO/artwork/" || { echo "Failed to copy artwork"; exit 1; }
cp -R "$FROM/fonts/." "$TO/fonts/" || { echo "Failed to copy fonts"; exit 1; }

echo "DSFR assets copied successfully."
