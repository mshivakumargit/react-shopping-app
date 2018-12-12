FROM mhart/alpine-node:latest

COPY . /app

WORKDIR /app

RUN npm install
