# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# En K8s, l'API est joignable via le proxy nginx sur /api (voir nginx.conf),
# donc un chemin relatif suffit et fonctionne quel que soit le cluster/domaine.
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---- Runtime stage ----
FROM nginx:1.27-alpine AS runtime

# Mise à jour des paquets Alpine pour corriger les failles de sécurité (ex: CVE-2026-31789 sur libssl3/libcrypto3)
RUN apk update && apk upgrade --no-cache

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
