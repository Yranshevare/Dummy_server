type ErrorConfig = {
    body: any;
    responseStatus: number;
};

type Method = "get" | "post" | "put" | "patch" | "delete";

type FieldType = "string" | "number" | "boolean" | "json" | "url";

export type { ErrorConfig, FieldType, Method };
