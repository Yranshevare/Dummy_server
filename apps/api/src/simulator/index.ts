import { HTTP_STATUS } from "@workspace/util/status-codes";
import error from "../util/error";
import latency from "./latency";

export default async function simulator(data: any) {
    try {
        await latency(data.latency || 0); // Simulate latency
        // query validation


        // data validation (for put/post/patch only)
        return {
            data: data.response,
            success: true,
        };
    } catch (error) {   // just throw error in validation code this catch will handle that
        return {
            data: null,
            success: false,
            status: (error as error).statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
            error: (error as error).message,
        };
    }
}
