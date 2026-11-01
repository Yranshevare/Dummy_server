type bodyTypeError = {
    body: any;
    responseStatus: number;
}

type bodyType = {
    type: "json" | "url" | "string" | "boolean" | "number";
    error: bodyTypeError;
    body?: Record<string, body>;
}

type body = {
    type: bodyType;
    required: boolean;
    error: bodyTypeError;
}

export type { body, bodyType, bodyTypeError };