import type { query } from "./query-type";
 

type apiType = {
    method: "GET";
    latency?: number;
    response: any;
    responseStatus: number;
    params?: Record<string, string>;
    query?: Record<string, query>;
};;

export type { apiType };
