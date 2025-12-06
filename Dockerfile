FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3001"]