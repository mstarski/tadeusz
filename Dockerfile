FROM node:14.19-alpine3.14 as build

LABEL "maintainer.name"="Michał Starski"
LABEL "maintainer.email"="michal.starski<at>pm.me"

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:14.19-alpine3.14 as dist

WORKDIR /app

COPY --from=build /app/dist .
COPY --from=build /app/node_modules node_modules
