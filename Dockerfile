FROM node:lts-alpine3.11

LABEL maintainer="arithalexis@gmail.com"

ENV PROJECT_DIR=/app

RUN npm install pm2 -g

WORKDIR $PROJECT_DIR

COPY package.json $PROJECT_DIR

RUN npm install

COPY . $PROJECT_DIR

ENV MEDIA_DIR=/media \
	NODE_ENV=dev \
	APP_PORT=3000

VOLUME $MEDIA_DIR

EXPOSE $APP_PORT

HEALTHCHECK CMD curl --fail http://localhost:$APP_PORT || exit

CMD ["npm", "run", "start:dev"]
