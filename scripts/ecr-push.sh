#!/bin/bash

# Login to aws
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 559970378337.dkr.ecr.eu-central-1.amazonaws.com && \

# Build locally
docker build -t tadeusz . && \

# Tag and push
docker tag tadeusz:latest 559970378337.dkr.ecr.eu-central-1.amazonaws.com/tadeusz:latest && \
docker push 559970378337.dkr.ecr.eu-central-1.amazonaws.com/tadeusz:latest
