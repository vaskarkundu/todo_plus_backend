# create a file named Dockerfile
FROM node:16-alpine
WORKDIR /app
CMD ["npm", "start"]