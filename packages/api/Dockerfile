FROM node:12.16-alpine as base

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY /lib ./lib
COPY /migrations ./migrations

COPY tsconfig.json ./
COPY knexfile.js ./

RUN npm run build

FROM node:12.16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=base /app/build ./build
COPY --from=base /app/migrations ./migrations
COPY --from=base /app/knexfile.js ./knexfile.js

CMD npm run migrate:up:prod && npm start