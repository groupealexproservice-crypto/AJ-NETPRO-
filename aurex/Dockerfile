FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY db/migrations ./db/migrations
COPY db/migrate.ts ./db/migrate.ts
# Documents live in a volume: mount it at /app/storage and set UPLOAD_DIR=/app/storage/uploads
VOLUME ["/app/storage"]
EXPOSE 3000
CMD ["node", "dist/boot.js"]
