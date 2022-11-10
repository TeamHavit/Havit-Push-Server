FROM node:16

WORKDIR /usr

COPY package*.json ./

RUN npm install -g typescript && yarn

ADD . .

EXPOSE 8081

CMD ["node", "dist"]