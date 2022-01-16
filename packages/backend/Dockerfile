FROM node:16 AS BUILD_IMAGE

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /app

COPY . .

ADD ./node_modules ./node_modules

RUN npm run build

RUN npm prune --production

RUN /usr/local/bin/node-prune

FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/build ./build
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

CMD [ "npm", "run", "serve" ]