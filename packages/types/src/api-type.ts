import type { body } from "./body-type";
import type { getCookie, setCookie } from "./cookie-type";
import type { query } from "./query-type";

type apiData = {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "PUT";
    latency?: number;
    response: any;
    responseStatus: number;
    setCookies?: Record<string, setCookie>;
    getCookies?: Record<string, getCookie>;
    query?: Record<string, query>;
    body?: Record<string, body>;
};

type apiType = Record<string, apiData>;

export type { apiType, apiData };
