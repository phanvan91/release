# release
ENV:
- node >= 16

cd node-app
- yarn install
- cp .env.example => .env
- start server : node server.js

cd react-app
- yarn install
- cp .env.example => .env
- yarn start

config docker mysql
- cd node-app
- docker-compose up -d

create DB:
- create database release_tool;
- use release_tool;
- import file sql: /node-app/release_1.sql
