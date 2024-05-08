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
for _ in {1..10}; do
    SERVER_URL="http://0.0.0.0:$ACTIVE_PORT"
    response=$(curl -s -o /dev/null -I -w "%{http_code}" "$SERVER_URL")

    echo "$SERVER_URL responded with status $response"

    if [[ $response -eq 200 ]]; then
        echo "Health check passed. Switching traffic"
        # Shift traffic
        sudo /bin/sed -i "s/:$INACTIVE_PORT/:$ACTIVE_PORT/g" "$CONFIG_FILE"
        # Should prevent sigkill
        sudo /bin/systemctl restart nginx || exit 1

        docker compose down $INACTIVE_SERVICE
        exit 0
    fi

    sleep 1
done

# Rollback
echo "Health check failed. Rolling back"
docker compose down $ACTIVE_SERVICE
exit 1
