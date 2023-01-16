FROM node:19.4.0

WORKDIR /app

COPY package.json .

RUN yarn install

CMD ["yarn", "start"]
