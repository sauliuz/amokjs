FROM node:22-alpine

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
