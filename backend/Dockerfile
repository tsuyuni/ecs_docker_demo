FROM node:22-alpine

RUN apk add bash && npm i -g prisma @nestjs/cli nodemon

WORKDIR /app

COPY package*.json ./

RUN npm ci

CMD ["npm", "run", "start:dev"]