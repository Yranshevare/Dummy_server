import { ConfigType } from "@workspace/types/config-type";
import { MethodType } from "@workspace/types/method-type";
import { CONFIG_PATH } from "@workspace/util/constant";
import { yamlParser } from "@workspace/util/yaml-parser";
import { Hono } from "hono";
import finder from "./finder";
import { HTTP_STATUS } from "@workspace/util/status-codes";

const app = new Hono();

const config = await yamlParser<ConfigType>(CONFIG_PATH);

app.all("*", async (c) => {
    const path: string = new URL(c.req.url).pathname;
    const method: MethodType = c.req.method as MethodType;

    const result = await finder(path, method);

    if (!result.success) {
        // @ts-ignore
        return c.json({ message: result.message, error: result.error }, result.status); // for some reason result.status is giving type error (type of result.status is number) for no reason, so ignoring it for now.
    }

    const data = result.data;

    return c.json(data, data.responseStatus);
});

export default {
    port: config?.api?.port || 3001,
    fetch: app.fetch,
};
