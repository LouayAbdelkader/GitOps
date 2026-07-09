# ============================
# Stage 1 : Dependencies
# ============================
FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
# Installe les dépendances via le lockfile
RUN npm ci --omit=dev

# ============================
# Stage 2 : Production
# ============================
FROM node:24-alpine AS production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# PATCH DE SÉCURITÉ (CVE-2026-12151) : le undici vulnérable ne vient PAS de nos
# dépendances (il n'apparaît même pas dans package-lock.json). Il est embarqué
# à l'intérieur du CLI npm lui-même, fourni par l'image de base node:24-alpine
# (ex: /usr/local/lib/node_modules/npm/node_modules/undici). npm n'a pas encore
# publié de correctif amont pour cette copie interne (bloqué par une dépendance
# à node-gyp au moment de l'écriture). Comme ce conteneur ne fait que
# "node src/server.js" en production, npm/npx/corepack ne servent à rien au
# runtime : on les supprime pour éliminer le fichier vulnérable de l'image finale
# plutôt que d'attendre un correctif upstream.
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/corepack

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node","src/server.js"]
