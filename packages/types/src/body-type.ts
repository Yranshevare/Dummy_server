type bodyTypeError = {
    body: any;
    responseStatus: number;
};

type bodyType = {
    type: "json" | "url" | "string" | "boolean" | "number";
    error: bodyTypeError;
    body?: Record<string, body>;
};

type bodyEqualsType = {
    value: any;
    error: bodyTypeError;
};

type body = {
    type: bodyType;
    required: boolean;
    error: bodyTypeError;
    equals?: bodyEqualsType;
};

export type { body, bodyType, bodyTypeError, bodyEqualsType };
