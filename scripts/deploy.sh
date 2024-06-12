#!/bin/bash

SERVICE="blog-front"
BLUE_SERVICE="$SERVICE-blue"
GREEN_SERVICE="$SERVICE-green"
CONFIG_FILE='/etc/nginx/sites-available/marshall-ku.com'
CHECKSUM_FILE='.checksum'
DOCKERIGNORE_FILE='.dockerignore'

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

# Ensure there is something to prune; if not, use default find parameters
if [ ${#EXCLUDE_ARGS[@]} -eq 0 ]; then
    EXCLUDE_ARGS=(-type f)
else
    EXCLUDE_ARGS+=(-type f -print)
fi

# Calculate the checksum of the relevant files
current_checksum=$(find . "${EXCLUDE_ARGS[@]}" -exec sha256sum {} + | sha256sum)

if [ -f $CHECKSUM_FILE ] && [ "$current_checksum" == "$(cat $CHECKSUM_FILE)" ]; then
    echo "No changes detected. Skipping deployment."
    exit 0
fi

echo "Changes detected. Deploying..."

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
        sudo /bin/sed -i "s/:$INACTIVE_PORT/:$ACTIVE_PORT/g" "$CONFIG_FILE" || exit 1
        # Should prevent sigkill
        sudo /bin/systemctl restart nginx || exit 1

        docker compose down $INACTIVE_SERVICE

        # Save the current checksum
        echo "$current_checksum" >$CHECKSUM_FILE
        exit 0
    fi

    sleep 1
done

# Rollback
echo "Health check failed. Rolling back"
docker compose down $ACTIVE_SERVICE
exit 1
