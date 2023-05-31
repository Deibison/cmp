FROM node:16-alpine

WORKDIR /var/www

COPY . .
RUN npm install
RUN npm install mime
RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash
    
COPY package*.json ./
RUN npm install

RUN npm run build

EXPOSE 8080
CMD ["node", "app.js"]


