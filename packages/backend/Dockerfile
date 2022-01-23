FROM node:14 AS BUILD_IMAGE

WORKDIR /app

COPY package.json package-lock.json /.

COPY ./node_modules ./node_modules

COPY ./build ./build

RUN npm prune --production

FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=BUILD_IMAGE /app/build ./build
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

CMD [ "node", "./build/index.js" ]