FROM node:18.16-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl dumb-init

ENV PORT 8080
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy Build
# Build directory as same structure than monorepo
COPY apps/web/.next/standalone .

# Copy public assets
COPY apps/web/public ./apps/web/public

# Copy static built assets (js and css)
COPY apps/web/.next/static ./apps/web/.next/static

EXPOSE $PORT

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "./apps/web/server.js"]
