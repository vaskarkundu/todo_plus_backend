#!/bin/bash

git pull origin master

docker-compose -f docker-compose.production-clients.yaml build

docker-compose -f docker-compose.production-clients.yaml down

docker-compose -f docker-compose.production-clients.yaml up -d

exit