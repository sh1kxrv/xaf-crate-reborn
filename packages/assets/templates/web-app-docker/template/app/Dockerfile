FROM node:18.13-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN npm i -g vite

RUN yarn build
