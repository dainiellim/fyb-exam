# be-app/Dockerfile

FROM node:22-alpine as builder

WORKDIR /app

# Copy package.json and install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build
COPY . .
# RUN npm run build

CMD ["node", "/main.js"]