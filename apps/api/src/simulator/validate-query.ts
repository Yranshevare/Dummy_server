import { query } from "@workspace/types/query-type";
import error from "../util/error";

export default function validateQuery(rules: Record<string, query>, query: Record<string, string>) {
    Object.entries(rules).forEach(([key, value]: [string, query]) => {
        const param = query[key];

        // required validation
        if (!param && value.required) {
            throw new error("query parameter is required", value.error.responseStatus, value.error.body);
        }

        // type validation
        if (param && value.type) {
            let typeError = false;

            if (value.type.type === "number" && !isNumeric(param)) {
                typeError = true;
            } else if (value.type.type === "boolean" && !isBoolean(param)) {
                typeError = true;
            }

            if (typeError) throw new error("invalid query type", value.type.error.responseStatus, value.type.error.body);
        }
    });
}

function isNumeric(str: string): boolean {
    if (/^\d+$/.test(str)) {
        return true;
    } else {
        return false;
    }
}

function isBoolean(str: string): boolean {
    if (str === "true" || str === "false") {
        return true;
    } else {
        return false;
    }
}
