FROM node:18-alpine

ENV HOME /usr/src/app
ENV MODE PROD
WORKDIR $HOME

COPY package*.json ./
RUN npm i --force

COPY . .

RUN npm run build

CMD ["npm", "start"]
