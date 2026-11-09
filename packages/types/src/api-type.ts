import type { body } from "./body-type";
import type { getCookie, setCookie } from "./cookie-type";
import type { query } from "./query-type";

type apiType = Record<
    string,
    {
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "PUT";
        latency?: number;
        response: any;
        responseStatus: number;
        setCookies?: Record<string, setCookie>;
        getCookies?: Record<string, getCookie>;
        params?: Record<string, string>;
        query?: Record<string, query>;
        body?: Record<string, body>;
    }
>;

export type { apiType };
