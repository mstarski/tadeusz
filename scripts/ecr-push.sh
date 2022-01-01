#!/bin/bash

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 559970378337.dkr.ecr.eu-central-1.amazonaws.com && \
docker build -t tadeusz . && \
docker tag tadeusz:latest 559970378337.dkr.ecr.eu-central-1.amazonaws.com/tadeusz:latest && \
docker push 559970378337.dkr.ecr.eu-central-1.amazonaws.com/tadeusz:latest
