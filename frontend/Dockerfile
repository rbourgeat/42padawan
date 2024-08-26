FROM node:latest

WORKDIR /app

COPY app/package.json app/package-lock.json ./

RUN npm install --legacy-peer-deps

EXPOSE 5173

CMD ["npm", "run", "dev"]
