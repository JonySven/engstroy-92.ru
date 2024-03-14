FROM node:18.15.0 AS build
WORKDIR /usr/src/app
COPY package.json .
RUN npm ci
COPY . .
RUN npm install gulp-cli  
RUN npm install           
RUN npx gulp build
FROM nginx:alpine as final
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf