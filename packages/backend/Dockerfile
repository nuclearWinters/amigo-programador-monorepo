FROM node:16.13.1

ENV NODE_ENV=production
ENV MONGO_DB=mongodb+srv://nuclearWinters:armando123@cluster0.krz20.mongodb.net/auth?retryWrites=true&w=majority
ENV REFRESHSECRET=ampauthrefresh
ENV ACCESSSECRET=ampauthaccess
ENV REDIS=redis://redis-auth.mc7gdz.0001.use2.cache.amazonaws.com:6379

WORKDIR /usr/src/service

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN npm run build

CMD [ "npm", "run", "serve" ]