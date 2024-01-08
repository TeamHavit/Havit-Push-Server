FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g typescript

RUN npm install -g cross-env

RUN yarn

ADD . .

EXPOSE 8081

ENTRYPOINT ["cross-env", "NODE_ENV=production", "node", "dist"]