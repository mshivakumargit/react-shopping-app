FROM mhart/alpine-node:latest

COPY . /app

WORKDIR /app

RUN npm install

RUN npm start

EXPOSE 3000

ENTRYPOINT ["index.js"]