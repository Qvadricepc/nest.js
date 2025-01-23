#!/bin/bash

# Define an array of volume paths
VOLUMES=(
  "./docker/postgres"
  "./docker/redis"
  "./docker/minio"
  "./docker/elasticmq"
)

# Iterate through each volume path and create the directory
for VOLUME in "${VOLUMES[@]}"; do
  if [ ! -d "$VOLUME" ]; then
    echo "Creating directory: $VOLUME"
    mkdir -p "$VOLUME"
    chmod -R 777 "$VOLUME" # Grant full access
  else
    echo "Directory already exists: $VOLUME"
  fi
done

echo "All volumes created successfully."