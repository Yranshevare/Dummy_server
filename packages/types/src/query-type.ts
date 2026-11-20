type queryErrorType = {
    body: any;
    responseStatus: number;
};

type queryType = {
    type: "string" | "number" | "boolean";
    error: queryErrorType;
};

type queryEqualsType = {
    value: any,
    error: queryErrorType
}

type query = {
    type?: queryType;
    required: boolean;
    error: queryErrorType;
    equals?: queryEqualsType
};

export type { query, queryType, queryErrorType };
