# Build from the repo root: docker build -f apps/webapp/Dockerfile .

FROM node:20.10-slim AS build
WORKDIR /app
ENV CYPRESS_INSTALL_BINARY=0


COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/webapp/package.json apps/webapp/
RUN npm ci

COPY . .
RUN npx nx build webapp

FROM nginx:1.27-alpine
COPY apps/webapp/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/webapp/dist /usr/share/nginx/html
