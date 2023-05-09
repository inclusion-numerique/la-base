FROM node:18.16-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl dumb-init

ENV PORT 8080
ENV NODE_ENV production

# App will have structure :
# /node_modules -> Root dependencies
# /apps/web
#      /node_modules -> apps/web dependencies
#      /.next -> next build
#      /src
#      /public
#      /...other stuff

# Copy root workspace dependencies
COPY node_modules ./node_modules

# Copy apps/web
COPY apps/web ./apps/web

EXPOSE $PORT

WORKDIR /app/apps/web

ENTRYPOINT ["dumb-init", "--"]

CMD ["node_modules/.bin/next", "start"]
