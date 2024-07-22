#!/bin/bash
# Install dependencies with yarn, freezing the lockfile
yarn install --frozen-lockfile --network-timeout 1000000

# Build the application
yarn build

# Start the application
yarn start