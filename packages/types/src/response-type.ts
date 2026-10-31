import type { apiType } from "./api-type";

type responseType = {
    success: boolean;
    data?: apiType;
    message: string;
    error?: string;
    status: number;
};

export type { responseType };