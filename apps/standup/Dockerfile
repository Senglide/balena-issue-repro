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
# COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN pnpm install --frozen-lockfile
# Make sure serialport builds for the raspberry pi
# RUN npm install serialport --build-from-source

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npx turbo run build --filter=@dripl/standup...
# Make Balena file creation script executable
RUN ["chmod", "+x", "apps/standup/createBalenaVariablesFile.sh"]

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/standup/package.json .
COPY --from=installer /app/apps/standup/next.config.js .
COPY --from=installer /app/apps/standup/createBalenaVariablesFile.sh .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/standup/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/standup/public ./apps/standup/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/standup/.next/static ./apps/standup/.next/static

CMD ./createBalenaVariablesFile.sh && node apps/standup/server.js