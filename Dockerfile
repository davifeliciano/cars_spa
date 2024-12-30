FROM node:20-alpine AS build

WORKDIR /app

ENV VITE_APP_API_URL=http://backend:8080

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80