import { MethodType } from "@workspace/types/method-type";
import { responseType } from "@workspace/types/response-type";
import error from "../util/error";
import { HTTP_STATUS } from "@workspace/util/status-codes";
import retrieve from "./retrieve";
import { DELETE_PATH, GET_PATH, PATCH_PATH, POST_PATH, PUT_PATH } from "@workspace/util/constant";

async function finder(route: string, method: MethodType): Promise<responseType> {
    try {
        switch (method) {
            case "GET":
                return await retrieve(route, GET_PATH);
            case "POST":
                return await retrieve(route, POST_PATH);
            case "PUT":
                return await retrieve(route, PUT_PATH);
            case "PATCH":
                return await retrieve(route, PATCH_PATH);
            case "DELETE":
                return await retrieve(route, DELETE_PATH);
            default:
                return {
                    success: false,
                    message: `Method ${method} not supported`,
                    error: `Method ${method} not supported`,
                    status: HTTP_STATUS.METHOD_NOT_ALLOWED
                };
        }
    } catch (error) {
        return {
            success: false,
            message: `Error occurred while processing the request:`,
            error: (error as error).message,
            status: (error as error).statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
        };
    }
}

export default finder;
