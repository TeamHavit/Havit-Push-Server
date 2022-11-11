ARG NODE_ENV

FROM node:16-alpine

ARG NODE_ENV

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g typescript

RUN npm install -g cross-env

RUN npm install -g nodemon

RUN yarn

ADD . .

EXPOSE 8081

ENTRYPOINT ["yarn", "start:dev"]
