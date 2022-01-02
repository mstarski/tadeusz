#!/bin/bash

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 559970378337.dkr.ecr.eu-central-1.amazonaws.com &> /dev/null

docker-compose down && \
docker-compose rm -f && \
docker-compose pull && \
docker-compose up -d \
