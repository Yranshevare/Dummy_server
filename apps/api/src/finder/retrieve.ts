import { responseType } from "@workspace/types/response-type";
import { yamlParser } from "@workspace/util/yaml-parser";
import error from "../util/error";
import { HTTP_STATUS } from "@workspace/util/status-codes";
import matchDynamicRoute from "../util/match-dynamic-route";

export default async function retrieve(reqRoute: string, ymlPath: string): Promise<responseType> {
    const data = await yamlParser<any>(ymlPath);

    // 1. Exact/static route match
    if (data[reqRoute]) {
        return {
            success: true,
            data: data[reqRoute],
            message: `Path ${reqRoute} found in GET data`,
            status: HTTP_STATUS.OK,
        };
    }

    // 2. Dynamic route matching
    for (const ymlRoute of Object.keys(data)) {
        const params = matchDynamicRoute(ymlRoute, reqRoute);

        if (params) {
            return {
                success: true,
                data: {
                    ...data[ymlRoute],
                    params,
                },
                message: `Dynamic path ${ymlRoute} matched ${reqRoute}`,
                status: HTTP_STATUS.OK,
            };
        }
    }

    // 3. Nothing matched
    throw new error(`Path ${reqRoute} not found in GET data`, HTTP_STATUS.NOT_FOUND);
}
