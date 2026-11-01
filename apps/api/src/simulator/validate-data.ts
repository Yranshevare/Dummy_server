import { body, bodyType } from "@workspace/types/body-type";
import error from "../util/error";
import isBoolean from "../util/is-boolean";
import isNumeric from "../util/is-numeric";

export default function validateData(rules: Record<string, body>, data: Record<string, any>) {
    // console.log(rules, data);
    Object.entries(rules).forEach(([key, value]: [string, body]) => {
        const param = data[key];

        // required validation
        if (!param && value.required) {
            throw new error("query parameter is required", value.error.responseStatus, value.error.body);
        }

        // type validation
        if (param && value.type) {
            if (!typeCheck(param, value.type)) throw new error("invalid query type", value.type.error.responseStatus, value.type.error.body);
        }

        // equals validation
        if (param && value.equals) {
            if (param !== value.equals.value) throw new error("invalid query value", value.equals.error.responseStatus, value.equals.error.body);
        }
    });
}

function typeCheck(param: any, type: bodyType): boolean {
    switch (type.type) {
        case "number":
            if (!isNumeric(param)) return true;
            break;
        case "boolean":
            if (!isBoolean(param)) return true;
            break;
        case "string":
            if (typeof param === "string") return true;
            break;
        case "json":
            if (typeof param !== "object" || param === null || Array.isArray(param)) {
                return false;
            }
            validateData(type.body ?? {}, param);   // using recursion to validate nested objects, don't worry if type validation fails, it will throw error and recursion will stop
            return true;
            break;
        case "url":
            try {
                new URL(param);
                return true;
            } catch (e) {
                return false;
            }
    }
    return false;
}
