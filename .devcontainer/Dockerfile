FROM node:lts-alpine

WORKDIR /app

# Configure apt and install packages
RUN apk update \
    && apk upgrade \
    #
    # add git and needed tools
    && apk add --virtual build-dependencies \
        build-base \
        gcc \
        wget \
        openssh-client \
        ca-certificates \
        git \
    #
    # add bash for npm script compatibility
    && apk add bash \
    #
    # Install eslint globally
    && npm install -g eslint \
    # cleanup
    && rm -rf /var/lib/apt/lists/* \
    && rm /var/cache/apk/*
    