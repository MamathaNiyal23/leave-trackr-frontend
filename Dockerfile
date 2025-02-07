FROM node:current-alpine3.20

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]