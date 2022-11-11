ARG NODE_ENV

FROM node:16-alpine

ARG NODE_ENV

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g typescript

RUN npm install -g cross-env

RUN yarn

ADD . .

EXPOSE 8081

ENTRYPOINT ["cross-env", "NODE_ENV=${NODE_ENV}", "node", "dist"]
