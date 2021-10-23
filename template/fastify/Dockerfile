FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/of-watchdog:0.8.4 as watchdog

####
#### Build stage
####
FROM --platform=${TARGETPLATFORM:-linux/amd64} node:14-alpine as builder

RUN apk --no-cache add curl bash ca-certificates \
    && addgroup -S app && adduser -S -g app app
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

RUN chmod 777 /tmp

USER app

RUN mkdir -p /home/app
# Wrapper/boot-strapper
RUN mkdir -p /tmp/app
WORKDIR /tmp/app
COPY package.json package-lock.json ./

# This ordering means the npm installation is cached for the outer function handler.
RUN npm install --production=true
RUN npm prune --production && /usr/local/bin/node-prune

RUN mkdir -p /tmp/app/function
WORKDIR /tmp/appfunction
RUN npm install
RUN npm prune
RUN /usr/local/bin/node-prune

WORKDIR /tmp/app
COPY . ./
# Run any tests that may be available
RUN npm test
RUN npm run compile

RUN mv ./build/* /home/app
RUN rm -rf /home/app/.npm

####
#### Ship stage
####
FROM --platform=${TARGETPLATFORM:-linux/amd64} mhart/alpine-node:slim-14 as ship

#RUN apk --no-cache add curl bash ca-certificates \
#    && addgroup -S app && adduser -S -g app app

ARG TARGETPLATFORM
ARG BUILDPLATFORM

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn
USER app

COPY --from=builder /tmp/app/build/* /home/app
WORKDIR /home/app/

ENV cgi_headers="true"
ENV fprocess="node index.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

ENV prefix_logs="false"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
