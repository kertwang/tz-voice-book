FROM node:10.15.3-alpine as intermediate
WORKDIR /opt/vb-server

RUN apk add --no-cache yarn git

COPY package.json yarn.lock tsconfig.json tslint.json /opt/vb-server/
RUN yarn

COPY tsconfig.json tslint.json /opt/vb-server/
COPY src /opt/vb-server/src
COPY config /opt/vb-server/config
COPY migrations /opt/vb-server/migrations

RUN npm run build

RUN rm -f /src
RUN npm prune --production

RUN apk del yarn git

# production stage
FROM node:10.15.3-alpine
WORKDIR /opt/vb-server

COPY --from=intermediate /opt/vb-server/node_modules /opt/vb-server/node_modules
COPY --from=intermediate /opt/vb-server/config /opt/vb-server/config
COPY --from=intermediate /opt/vb-server/dist /opt/vb-server/dist
COPY --from=intermediate /opt/vb-server/package.json /opt/vb-server/package.json

RUN adduser -D dockeruser
USER dockeruser
CMD ["npm", "run", "start"]