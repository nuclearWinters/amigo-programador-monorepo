FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package.json package-lock.json ./

COPY /build ./build

COPY /node_modules ./node_modules

RUN npm prune --production --force

FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=BUILD_IMAGE /app/build ./build
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

CMD [ "node", "./build/index.js" ]