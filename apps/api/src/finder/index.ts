import { MethodType } from "@workspace/types/method-type";
import { responseType } from "@workspace/types/response-type";
import retrieveDelete from "./retrieve-delete";
import retrieveGet from "./retrieve-get";
import retrievePatch from "./retrieve-patch";
import retrievePost from "./retrieve-post";
import retrievePut from "./retrieve-put";
import error from "../util/error";
import { HTTP_STATUS } from "@workspace/util/status-codes";

async function finder(path: string, method: MethodType): Promise<responseType> {
    try {
        switch (method) {
            case "GET":
                return await retrieveGet(path);
            case "POST":
                return await retrievePost(path);
            case "PUT":
                return await retrievePut(path);
            case "PATCH":
                return await retrievePatch(path);
            case "DELETE":
                return await retrieveDelete(path);
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
