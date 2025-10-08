FROM node:22.20.0-alpine AS base

RUN apk add --no-cache libc6-compat \
    && apk update

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /app

# remove all empty node_modules folder structure
RUN rm -rf /app/out/full/*/*/node_modules \
    # Create log file for New Relic agent
    && touch newrelic_agent.log

FROM base AS builder

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@marshallku/blog --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

ENV TZ=Asia/Seoul
RUN echo "Asia/Seoul" > /etc/timezone

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG TURBO_TEAM
ENV TURBO_TEAM=${TURBO_TEAM:-marshallk}

ARG TURBO_API
ENV TURBO_API=${TURBO_API}

RUN pnpm turbo run build --filter=@marshallku/blog...

FROM base AS runner
WORKDIR /app

COPY --from=installer /app/apps/blog/newrelic.js .
RUN pnpm add newrelic

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/blog/next.config.js .
COPY --from=installer /app/apps/blog/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/blog/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/blog/.next/static ./apps/blog/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/blog/public ./apps/blog/public
COPY --from=base --chown=nextjs:nodejs /app/newrelic_agent.log ./newrelic_agent.log

CMD node -r newrelic apps/blog/server.js
