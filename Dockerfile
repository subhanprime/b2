FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . .
CMD npm start
