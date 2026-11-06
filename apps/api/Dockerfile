# Build from the repo root: docker build -f apps/api/Dockerfile .

FROM node:20.10-slim AS build
WORKDIR /app

ENV CYPRESS_INSTALL_BINARY=0

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/webapp/package.json apps/webapp/
RUN npm ci

COPY . .
RUN npx nx build api && npm prune --omit=dev

FROM node:20.10-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist/apps/api ./dist/apps/api
COPY --chown=node:node db ./db
USER node
EXPOSE 3333
CMD ["node", "dist/apps/api/main.js"]
