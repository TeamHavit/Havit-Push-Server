ARG NODE_ENV

FROM node:16

ARG NODE_ENV

WORKDIR /usr

COPY package*.json ./

RUN npm install -g typescript && yarn

ADD . .

EXPOSE 8081

CMD ["./node_modules/.bin/cross-env", "NODE_ENV", "=", "$NODE_ENV", "node", "dist"]