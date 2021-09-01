FROM node:14

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["node", "server.js"]
