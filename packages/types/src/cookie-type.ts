type setCookie = {
    value: string;
    path?: string;
    httpOnly?: boolean;
    maxAge?: number;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
}

type cookieErrorType = {
    body: any;
    responseStatus: number;
}

type getCookie = {
    type: {
        type: "string" | "boolean" | "number";
        error: cookieErrorType;
    },
    required: boolean
    error: cookieErrorType
    equals?: {
        value: any;
        error: cookieErrorType;
    }
}

export type { setCookie, getCookie, cookieErrorType }; 