FROM node:20

WORKDIR /Dongi-Server
COPY package.json .
RUN npm install
COPY . .
CMD npm start
