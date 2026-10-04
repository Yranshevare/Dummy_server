type GET = {
    method: "GET";
    latency?: number;
    response: any;
    responseStatus: number;
    params?: Record<string, string>;
    query?: Record<string, string>;
};

type apiType = GET;

export type { GET, apiType };
