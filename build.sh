#!/bin/bash

echo "--- Starting Project Build ---"

# Exit immediately if a command exits with a non-zero status.
set -e

# Step 1: Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Step 2: Generate 3D models
echo "Generating 3D models..."
python generate_spaceship.py

# Step 3: Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

echo "--- Build Complete! ---"
echo "You can now start the server by running 'npm start' or using the start.sh script."
