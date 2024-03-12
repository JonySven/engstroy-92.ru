FROM node:18.10.0 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.17.1-alpine
COPY --from=builder /usr/src/app/dist/dfa-landing /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf