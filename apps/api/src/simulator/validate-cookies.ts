import { getCookie } from "@workspace/types/cookie-type";
import error from "../util/error";
import isNumeric from "../util/is-numeric";
import isBoolean from "../util/is-boolean";

export default function validateCookies(rules: Record<string, getCookie>, cookies: Record<string, any>) {
    Object.entries(rules).forEach(([key, value]: [string, getCookie]) => {
        const cookie = cookies[key];

        // required validation
        if (!cookie && value.required) {
            throw new error("cookie is required", value.error.responseStatus, value.error.body);
        }

        // type validation
        if (cookie && value.type) {
            let typeError = false;

            switch (value.type.type) {
                case "number":
                    if (!isNumeric(cookie)) typeError = true;
                    break;
                case "boolean":
                    if (!isBoolean(cookie)) typeError = true;
                    break;
            }

            if (typeError) throw new error("invalid query type", value.type.error.responseStatus, value.type.error.body);
        }

        // equals validation
        if (cookie && value.equals) {
            if (cookie !== value.equals.value) throw new error("invalid query value", value.equals.error.responseStatus, value.equals.error.body);
        }
    });
}
