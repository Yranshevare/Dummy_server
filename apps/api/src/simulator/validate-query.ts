import { query } from "@workspace/types/query-type";
import error from "../util/error";

export default function validateQuery(rules: Record<string, query>, query: Record<string, string>) {
    console.log(query);
    // console.log(rules);
    // type validation
    Object.entries(rules).forEach(([key, value]) => {
        const param = query[key];

        if (!param && value.required) {
            throw new error(value.error.errorMessage, value.error.responseStatus);
        }

        // type validation
        if (param && typeof param !== value.type.type) {
            throw new error(value.type.errorMessage, value.type.responseStatus);
        }
    });
}
