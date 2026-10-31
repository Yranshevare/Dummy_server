import { ConfigType } from "@workspace/types/config-type";
import { MethodType } from "@workspace/types/method-type";
import { CONFIG_PATH } from "@workspace/util/constant";
import { yamlParser } from "@workspace/util/yaml-parser";
import { Hono } from "hono";
import finder from "./finder";
import simulator from "./simulator";
import { HTTP_STATUS } from "@workspace/util/status-codes";

const app = new Hono();

const config = await yamlParser<ConfigType>(CONFIG_PATH);

app.all("*", async (c) => {
    const route: string = new URL(c.req.url).pathname;
    const method: MethodType = c.req.method as MethodType;
    const query = c.req.query();

    const result = await finder(route, method);

    if (!result.success) {
        // @ts-ignore
        return c.json({ message: result.message, error: result.error }, result.status); // for some reason result.status is giving type error (type of result.status is number) for no reason, so ignoring it for now.
    }

    const apiConfig = result.data;

    if (!apiConfig) {
        return c.json(
            {
                message: "try configuring your api properly",
                error: "ERROR FROM DUMMY SERVER: no data to simulate API",
            },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }

    const res = await simulator(apiConfig, query);

    // console.log(res)

    if (!res.success) {
        // @ts-ignore
        return c.json(res.data, res.status); // for some reason result.status is giving type error (type of result.status is number) for no reason, so ignoring it for now.
    }

    // @ts-ignore
    return c.json(res.data, apiConfig.responseStatus);
});

app.get("/test", async (c) => {
    return c.json({ id: 123, name: "test", email: "test@test" }, 200);
});

export default {
    port: config?.api?.port || 3001,
    fetch: app.fetch,
};
