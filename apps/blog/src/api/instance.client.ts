"use client";

import httpClient, { HTTPClient } from "#utils/httpClient";

export const request: HTTPClient<unknown> = httpClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    interceptors: {
        async response(response) {
            try {
                return await response.json();
            } catch {
                // eslint-disable-next-line no-console
                console.error("Failed to parse response body as JSON.");
                return null;
            }
        },
    },
});
