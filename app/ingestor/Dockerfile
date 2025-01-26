FROM node:20-alpine AS build

WORKDIR /usr/src/NikNakPackages

COPY ./NikNakPackages .

RUN npm i -g corepack
RUN corepack enable
RUN yarn set version 4.6.0

RUN yarn install --inline-builds

RUN yarn build

WORKDIR /usr/src/NikNakLocalStack/app

COPY ./NikNakLocalStack/app/package.json .
COPY ./NikNakLocalStack/app/yarn.lock .
COPY ./NikNakLocalStack/app/.yarn/releases ./.yarn/releases
COPY ./NikNakLocalStack/app/.yarnrc.yml .
COPY ./NikNakLocalStack/app/scripts ./scripts
COPY ./NikNakLocalStack/app/datasource.ts .
COPY ./NikNakLocalStack/app/tsconfig.json .
COPY ./NikNakLocalStack/app/ingestor ./ingestor

RUN npm i -g corepack
RUN corepack enable
RUN yarn set version 4.6.0

RUN yarn install --inline-builds

RUN ls

WORKDIR /usr/src/NikNakLocalStack/app/ingestor

RUN yarn build

RUN chown -R node:node /usr/src

EXPOSE 8084

USER node

CMD ["yarn", "dev"]