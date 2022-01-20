FROM node:16-alpine3.11

RUN apk add --no-cache bash \
  && npm install --g @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app
