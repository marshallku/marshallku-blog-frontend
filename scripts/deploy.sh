#!/bin/bash

SERVICE="blog-front"
BLUE_SERVICE="$SERVICE-blue"
GREEN_SERVICE="$SERVICE-green"
CONFIG_FILE='/etc/nginx/sites-available/marshall-ku.com'

cd ~/dev/marshallku-blog-frontend || exit 1
git pull origin master

ACTIVE_SERVICE=''
INACTIVE_SERVICE=''

if docker ps --format "{{.Names}}" | grep -q "$BLUE_SERVICE"; then
    echo "Switching to green"
    ACTIVE_SERVICE="$GREEN_SERVICE"
    INACTIVE_SERVICE="$BLUE_SERVICE"
else
    echo "Switching to blue"
    ACTIVE_SERVICE="$BLUE_SERVICE"
    INACTIVE_SERVICE="$GREEN_SERVICE"
fi

ACTIVE_PORT=$([ "$ACTIVE_SERVICE" == "$BLUE_SERVICE" ] && echo '4200' || echo '4201')
INACTIVE_PORT=$([ "$ACTIVE_SERVICE" == "$BLUE_SERVICE" ] && echo '4201' || echo '4200')

# Build container
docker compose up --build -d $ACTIVE_SERVICE

# Health check
sleep 10

SERVER_URL="http://0.0.0.0:$ACTIVE_PORT"
response=$(curl -s -o /dev/null -I -w "%{http_code}" "$SERVER_URL")

if [[ $response -eq 200 ]]; then
    # Shift traffic
    echo "$SERVER_URL responded with status 200, deploying $ACTIVE_SERVICE"
    sudo /bin/sed -i "s/:$INACTIVE_PORT/:$ACTIVE_PORT/g" "$CONFIG_FILE"
    # Should prevent sigkill
    sudo /bin/systemctl restart nginx || exit 1

    docker compose down $INACTIVE_SERVICE
else
    # Rollback
    echo "$ACTIVE_SERVICE is DOWN, terminating..."
    docker compose down $ACTIVE_SERVICE
    exit 1
fi
