ARG NODE_ENV

FROM node:16

ARG NODE_ENV

WORKDIR /usr

COPY package*.json ./

RUN npm install -g typescript && yarn && yarn add cross-env

ADD . .

EXPOSE 8081

CMD ["cross-env", "NODE_ENV", "=", "$NODE_ENV", "node", "dist"]
