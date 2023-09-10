#https://dev.to/alex_barashkov/using-docker-for-nodejs-in-development-and-production-3cgp

# The instructions for the first stage
FROM node:10-alpine as builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++

COPY app/package*.json ./
RUN npm install

# The instructions for second stage
FROM node:10-alpine

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY ./app .

CMD [ "node", "./bin/www" ]