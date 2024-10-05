FROM node:22-alpine

RUN apk add bash

WORKDIR /app

COPY package*.json ./

RUN npm ci

CMD ["npm", "run", "dev"]
