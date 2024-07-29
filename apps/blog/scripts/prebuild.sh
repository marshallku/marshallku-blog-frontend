#!/bin/sh

# Copy .env.example to .env if .env does not exist
if [ ! -f .env ]; then
    cp .env.example .env
fi
