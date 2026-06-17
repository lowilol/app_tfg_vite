# ---- Stage 1: Build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# ---- Stage 2: Servir con vite preview ----
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY --from=builder /app/dist ./dist
COPY vite.config.js ./
EXPOSE 4173
CMD ["npx", "vite", "preview", "--host", "--port", "4173"]
