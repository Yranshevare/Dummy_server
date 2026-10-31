import { HTTP_STATUS } from "@workspace/util/status-codes";
import error from "../util/error";
import latency from "./latency";
import validateQuery from "./validate-query";
import { responseType } from "@workspace/types/response-type";
import { apiType } from "@workspace/types/api-type";

export default async function simulator(data: apiType, query: Record<string, string>): Promise<responseType> {
    try {
        await latency(data.latency || 0); // Simulate latency

        // query validation
        if (data.query) {
            validateQuery(data.query, query);
        }

        // data validation (for put/post/patch only)
        return {
            data: data.response,
            success: true,
            status: HTTP_STATUS.OK,
            message: "Simulated response",
        };
    } catch (error) {
        // just throw error in validation code this catch will handle that
        console.log(error);
        return {
            success: false,
            status: (error as error).statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
            error: (error as error).message,
            message: (error as error).message,
        };
    }
}
