FROM mhart/alpine-node:16 AS builder

WORKDIR /app

COPY . .

RUN npm i -g yarn

RUN yarn install

RUN yarn build

FROM nginx:1.16.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]