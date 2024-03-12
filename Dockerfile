FROM node:18.10.0 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build
FROM nginx:alpine as final
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf