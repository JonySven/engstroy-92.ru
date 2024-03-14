FROM node:16-buster as builder
WORKDIR /usr/src/app
COPY package.json .
COPY . .
RUN npm install gulp-cli  
RUN npm install           
RUN npx gulp build
FROM nginx:alpine as final
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf