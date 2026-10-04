import { PATCH_PATH } from "@workspace/util/constant";
import { responseType } from "@workspace/types/response-type";
import { yamlParser } from "@workspace/util/yaml-parser";
import error from "../util/error";
import { HTTP_STATUS } from "@workspace/util/status-codes";

export default async function retrievePatch(path: string): Promise<responseType> {
    const data = await yamlParser<any>(PATCH_PATH);
    
    if (!data[path]) {
        throw new error(`Path ${path} not found in PATCH data`, HTTP_STATUS.NOT_FOUND);
    }
    return {
        success: true,
        data: data[path],
        message: `Path ${path} found in PATCH data`,
        status: HTTP_STATUS.OK
    };
}
