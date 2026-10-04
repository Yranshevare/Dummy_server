import { POST_PATH } from "@workspace/util/constant";
import { responseType } from "@workspace/types/response-type";
import { yamlParser } from "@workspace/util/yaml-parser";
import error from "../util/error";
import { HTTP_STATUS } from "@workspace/util/status-codes";

export default async function retrievePost(path: string): Promise<responseType> {
    const data = await yamlParser<any>(POST_PATH);
    
    if (!data[path]) {
        throw new error(`Path ${path} not found in POST data`, HTTP_STATUS.NOT_FOUND);
    }
    return {
        success: true,
        data: data[path],
        message: `Path ${path} found in POST data`,
        status: HTTP_STATUS.OK
    };
}
