ARG NODE_IMAGE=node:lts

FROM $NODE_IMAGE AS init
    RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
    WORKDIR /usr/src/app
    RUN mkdir -p dist && chown node:node dist
    USER node
    RUN mkdir tmp

FROM init AS dependencies
    COPY --chown=node:node ./package*.json ./
    RUN npm install --force
    COPY --chown=node:node . .

FROM dependencies AS build
    RUN npm run build

FROM init AS production
    ENV NODE_ENV=production
    COPY --chown=node:node ./package*.json ./
    RUN npm ci --force
    COPY --chown=node:node --from=build /usr/src/app/dist .
    EXPOSE 3000
    CMD ["node", "main"]