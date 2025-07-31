FROM node:18-alpine AS builder

COPY package*.json ./

RUN npm i

COPY . .

RUN npm rebuild esbuild

RUN npm run build

FROM nginx:stable-alpine

# Копируем собранное приложение
COPY --from=builder /dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]