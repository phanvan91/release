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