"use client";

import { to } from "@marshallku/utils";

import httpClient, { type HTTPClient } from "#utils/httpClient";

export const request: HTTPClient<unknown> = httpClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    interceptors: {
        async response(response) {
            const [error, body] = await to(response.json());

            if (error) {
                 
                console.error("Failed to parse response body as JSON.");
                return null;
            }

            if (!response.ok) {
                 
                console.error(body);
                throw new Error(body.message);
            }

            return body;
        },
    },
});
