import { HTTP_STATUS } from "@workspace/util/status-codes";
import error from "../util/error";
import latency from "./latency";
import validateQuery from "./validate-query";
import { responseType } from "@workspace/types/response-type";
import { apiType } from "@workspace/types/api-type";
import validateData from "./validate-data";
import validateCookies from "./validate-cookies";

export default async function simulator(
    data: apiType,
    query: Record<string, string>,
    body: any,
    cookies: Record<string, string>
): Promise<responseType> {
    try {
        // cookie validation
        if (data.getCookies) {
            validateCookies(data.getCookies, cookies);
        }

        // Simulate latency
        await latency(data.latency || 0); 

        // query validation
        if (data.query) {
            validateQuery(data.query, query);
        }

        // data validation (for put/post/patch only)
        if (["PUT", "POST", "PATCH"].includes(data.method)) {
            validateData(data.body || {}, body);
        }

        return {
            data: data.response,
            success: true,
            status: HTTP_STATUS.OK,
            message: "Simulated response",
        };
    } catch (error) {
        // just throw error in validation code this catch will handle that
        return {
            data: (error as error).data,
            success: false,
            status: (error as error).statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
            error: (error as error).message,
            message: (error as error).message,
        };
    }
}
