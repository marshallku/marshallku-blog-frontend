"use server";

import { cookies, headers } from "next/headers";

import httpClient, { type HTTPClient } from "#utils/httpClient";

const initializeHeaders = async (initHeaders?: RequestInit["headers"]) => {
    const httpHeaders = await headers();
    const httpCookies = await cookies();

    return {
        "User-Agent": httpHeaders.get("User-Agent") ?? "",
        "x-forwarded-for": httpHeaders.get("x-forwarded-for") ?? "",
        "x-real-ip": httpHeaders.get("x-real-ip") ?? "",
        referer: httpHeaders.get("referer") ?? "",
        Cookie: httpCookies.toString(),
        ...initHeaders,
    };
};

/**
 * Redirects if the response status is 401.
 */
export const request: HTTPClient<unknown> = httpClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    interceptors: {
        async request(_, init) {
            const initializedHeaders = await initializeHeaders(init.headers);
            init.headers = { ...init.headers, ...initializedHeaders };
            return init;
        },
        async response(response) {
            try {
                return await response.json();
            } catch {
                 
                console.error("Failed to parse response body as JSON.");
                return null;
            }
        },
    },
});
