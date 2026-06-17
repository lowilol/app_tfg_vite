FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
RUN npm install nodemailer
RUN npm install mysql2
COPY . .

EXPOSE 4000

CMD ["node", "app.js"]
