FROM node:10 as build
WORKDIR /usr/src/app
COPY micro-app-client/package*.json ./
RUN npm install --silent
COPY micro-app-client/. .
RUN npm run build

FROM node:10
WORKDIR /usr/src/app
COPY micro-app-server/package*.json ./
RUN npm install --silent
COPY micro-app-server/. .
RUN mkdir ./public
COPY --from=build /usr/src/app/build ./public
EXPOSE 8080
LABEL NAME="Vijay Donthireddy"
LABEL VERSION="1.0"
CMD ["npm", "start"]