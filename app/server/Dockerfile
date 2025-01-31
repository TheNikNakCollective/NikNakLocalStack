FROM node:20-alpine AS build

WORKDIR /usr/src/NikNakPackages

COPY ./NikNakPackages .

RUN apk add --no-cache openjdk17
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"
RUN java -version

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
COPY ./NikNakLocalStack/app/server ./server

RUN npm i -g corepack
RUN corepack enable
RUN yarn set version 4.6.0

RUN yarn install --inline-builds

RUN ls

WORKDIR /usr/src/NikNakLocalStack/app/server

RUN yarn build

RUN chown -R node:node /usr/src

EXPOSE 8083

USER node

CMD ["yarn", "dev"]