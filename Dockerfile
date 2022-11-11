ARG NODE_ENV

FROM node:16-alpine

ARG NODE_ENV

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g typescript

RUN yarn

ADD . .

EXPOSE 8081

ENTRYPOINT ["/usr/app/node_modules/.bin/cross-env", "NODE_ENV=development", "node", "dist"]
