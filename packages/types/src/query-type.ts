type queryErrorType = {
    body: any;
    responseStatus: number;
};

type queryType = {
    type: "string" | "number" | "boolean";
    error: queryErrorType;
};

type query = {
    type?: queryType;
    required: boolean;
    error: queryErrorType;
};

export type { query, queryType, queryErrorType };
