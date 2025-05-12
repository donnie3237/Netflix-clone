FROM node:lts

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8888

CMD ["npm", "run","start:prod"]
