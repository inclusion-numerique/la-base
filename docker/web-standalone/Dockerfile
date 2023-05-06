FROM node:20.1.0-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

ENV PORT 8080
ENV NODE_ENV development

# App will have structure :
# /node_modules -> Root dependencies
# /web
#   /node_modules -> apps/web dependencies
#   /.next -> next build
#   /server.js
#   /public
#   /...other stuff

# Copy root workspace dependencies
COPY node_modules ./node_modules

# Copy apps/web dependencies
COPY apps/web/node_modules ./web/node_modules

# Copy next build
COPY apps/web/.next/standalone/package.json ./web/package.json
COPY apps/web/.next/standalone/server.js ./web/server.js
COPY apps/web/.next/standalone/.next ./web/.next

# Copy public assets
COPY apps/web/public ./web/public

# Copy static assets
COPY apps/web/.next/static ./web/.next/static

EXPOSE $PORT

CMD ["node", "web/server.js"]
