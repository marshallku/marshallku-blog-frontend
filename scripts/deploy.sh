#!/bin/bash

# Simplified deployment script using Traffic Switcher's port switching
# Usage: ./deploy.sh [service] [blue_port] [green_port]

SERVICE_NAME="blog-front"
BLUE_PORT="4200"
GREEN_PORT="4201"
API_URL="http://localhost:1143"
CHECKSUM_FILE='.checksum'
DOCKERIGNORE_FILE='.dockerignore'

cd ~/dev/marshallku-blog-frontend/apps/blog/_posts || exit 1
git pull origin master
cd ~/dev/marshallku-blog-frontend || exit 1
git pull origin master

# List of patterns to exclude from checksum calculation
EXCLUDE_ARGS=()
if [ -f $DOCKERIGNORE_FILE ]; then
    while IFS= read -r line; do
        [[ "$line" == "" || "$line" == \#* ]] && continue
        EXCLUDE_ARGS+=(-path "./$line" -prune -o)
    done <$DOCKERIGNORE_FILE
fi

EXCLUDE_ARGS+=(-path "./.turbo" -prune -o)
EXCLUDE_ARGS+=(-path "./.git" -prune -o)
EXCLUDE_ARGS+=(-type f -print)

# Calculate the checksum of the relevant files
current_checksum=$(find . "${EXCLUDE_ARGS[@]}" -exec sha256sum {} + | sha256sum)

if [ -f $CHECKSUM_FILE ] && [ "$current_checksum" == "$(cat $CHECKSUM_FILE)" ]; then
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}No changes detected, skipping deployment${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    exit 0
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Starting deployment for service: ${YELLOW}$SERVICE_NAME${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Get current service configuration
echo -e "\n${BLUE}Checking current configuration...${NC}"
CURRENT_CONFIG=$(curl -s "$API_URL/config" | jq ".services[] | select(.name == \"$SERVICE_NAME\")")

if [ -z "$CURRENT_CONFIG" ]; then
    echo -e "${RED}✗ Service '$SERVICE_NAME' not found${NC}"
    exit 1
fi

CURRENT_PORT=$(echo "$CURRENT_CONFIG" | jq -r '.port')
echo -e "${GREEN}✓ Current port: $CURRENT_PORT${NC}"

# Determine target port (switch between blue and green)
if [ "$CURRENT_PORT" == "$BLUE_PORT" ]; then
    TARGET_PORT=$GREEN_PORT
    TARGET_COLOR="green"
    CONTAINER_NAME="${SERVICE_NAME}-green"
    PREVIOUS_CONTAINER_NAME="${SERVICE_NAME}-blue"
else
    TARGET_PORT=$BLUE_PORT
    TARGET_COLOR="blue"
    CONTAINER_NAME="${SERVICE_NAME}-blue"
    PREVIOUS_CONTAINER_NAME="${SERVICE_NAME}-green"
fi

echo -e "${GREEN}✓ Target port: $TARGET_PORT (${TARGET_COLOR})${NC}"

# Build and start the target container
echo -e "\n${BLUE}Building and starting container on port $TARGET_PORT...${NC}"
docker compose up --build -d "$CONTAINER_NAME"

# Wait for container to be ready
echo -e "${BLUE}Waiting for container to initialize...${NC}"
for i in {1..5}; do
    echo -n "."
    sleep 1
done
echo ""

PORT_CHECK_RESPONSE=$(curl -s -w "%{http_code}" -X POST "$API_URL/config/port" \
    -H "Content-Type: application/json" \
    -d "{
        \"service\": \"$SERVICE_NAME\",
        \"port\": $TARGET_PORT,
        \"skip_health_check\": false
    }")

# Extract HTTP status code (last line) and response body
HTTP_STATUS=$(echo "$PORT_CHECK_RESPONSE" | tail -c 4)
RESPONSE_BODY=$(echo "$PORT_CHECK_RESPONSE" | head -c -4)

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ Previous container:${NC} $PREVIOUS_CONTAINER_NAME"
    docker compose down "$PREVIOUS_CONTAINER_NAME"
    echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    exit 0
else
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}Deployment failed and rolled back ${HTTP_STATUS}${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    docker compose stop "$CONTAINER_NAME"
    exit 1
fi


