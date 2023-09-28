FROM node:18-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=@dripl/standup --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
# Python is needed to build serialport
RUN apk add --no-cache --virtual .gyp python3 make linux-headers udev g++
# Make sure bash is up to date for executing scripts
RUN apk add --no-cache --upgrade bash
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npx turbo run build --filter=@dripl/standup

CMD npx turbo run start --filter=@dripl/standup
