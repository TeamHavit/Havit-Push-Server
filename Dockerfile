FROM node:16

WORKDIR /usr

COPY package*.json ./

RUN npm install -g yarn && yarn

ADD . .

EXPOSE 8081

CMD ["yarn start"]