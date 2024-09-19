"use client";

import httpClient, { HTTPClient } from "#utils/httpClient";
import { to } from "@marshallku/utils";

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
                // eslint-disable-next-line no-console
                console.error("Failed to parse response body as JSON.");
                return null;
            }

            if (!response.ok) {
                // eslint-disable-next-line no-console
                console.error(body);
                throw new Error(body.message);
            }

            return body;
        },
    },
});
