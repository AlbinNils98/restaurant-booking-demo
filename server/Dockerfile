
FROM node:20 AS builder
WORKDIR /server
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /server
COPY --from=builder /server/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /server/dist ./dist
EXPOSE 4000
CMD ["node","dist/index.js"]