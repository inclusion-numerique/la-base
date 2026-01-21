FROM node:25.4-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl dumb-init

ENV PORT 8080
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV HOSTNAME "0.0.0.0"

# Copy Build
# Build directory as same structure than monorepo
COPY apps/web/.next/standalone .

# Copy public assets
COPY apps/web/public ./apps/web/public

# Copy static server files not imported by bundler (csv, json, etc...)
COPY apps/web/private-static ./apps/web/private-static

# Copy static built assets (js and css)
COPY apps/web/.next/static ./apps/web/.next/static

EXPOSE $PORT

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "./apps/web/server.js"]
