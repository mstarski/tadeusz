#!/bin/bash

# init script used by the target server to update and start the service

IMAGE_NAME=559970378337.dkr.ecr.eu-central-1.amazonaws.com/tadeusz;
CONTAINER_NAME=tadeo;
ENV_FILE_LOCATION=${1:-env}

function warn() {
  WARN_COLOR='\e[0;33m';
  WHITE_COLOR='\e[0;37m';
  TEXT=$1;

  echo -e "${WARN_COLOR}${TEXT}${WHITE_COLOR}";
}

# Check if container is already running
if [[ $(docker ps | grep $CONTAINER_NAME | wc -l) -gt 0 ]];
then
  warn "Tadeusz is running, stopping existing container first...";

  docker stop $CONTAINER_NAME &> /dev/null;
  docker rm $CONTAINER_NAME &> /dev/null;

  warn "Tadeusz container has been stopped.";
fi

# Remove old image if exists
if [[ $(docker images | grep $IMAGE_NAME | wc -l) -gt 0 ]];
then
  warn "Removing old tadeusz image...";

  docker rmi $IMAGE_NAME;

  warn "${IMAGE_NAME} image removed."
fi

warn "Starting the service...";

# Start a new container
NEW_CONTAINER_ID=$(docker run --name $CONTAINER_NAME --env-file=${ENV_FILE_LOCATION} -d "${IMAGE_NAME}:latest" main.js)

warn "Tadeusz container has been started with ID ${NEW_CONTAINER_ID}."
