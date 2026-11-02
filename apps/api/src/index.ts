import { ConfigType } from "@workspace/types/config-type";
import { MethodType } from "@workspace/types/method-type";
import { CONFIG_PATH } from "@workspace/util/constant";
import { yamlParser } from "@workspace/util/yaml-parser";
import { Hono } from "hono";
import finder from "./finder";
import simulator from "./simulator";
import { HTTP_STATUS } from "@workspace/util/status-codes";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono();

const config = await yamlParser<ConfigType>(CONFIG_PATH);

app.all("*", async (c) => {
    const route: string = new URL(c.req.url).pathname;
    const method: MethodType = c.req.method as MethodType;
    const query = c.req.query();

    let body = null;
    if (["POST", "PUT", "PATCH"].includes(method)) {
        body = await c.req.json();
    }

    // retrieving api config
    const result = await finder(route, method);

    if (!result.success) {
        // @ts-ignore
        return c.json({ message: result.message, error: result.error }, result.status); // for some reason result.status is giving type error (type of result.status is number) for no reason, so ignoring it for now.
    }

    const apiConfig = result.data;

    // error for missing api config
    if (!apiConfig) {
        return c.json(
            {
                message: "try configuring your api properly",
                error: "ERROR FROM DUMMY SERVER: no data to simulate API",
            },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }


    // simulating api: validation / latency
    const res = await simulator(apiConfig, query, body, getCookie(c));

    if (!res.success) {
        // if validation failed
        // return the user defined response
        // @ts-ignore
        return c.json(res.data, res.status); // for some reason res.status is giving type error (type of res.status is number) for no reason, so ignoring it for now.
    }

    // if validation passed and response is successful then set cookies if any
    if (apiConfig.setCookies) {
        console.log("setting cookies", apiConfig.setCookies);
        Object.entries(apiConfig.setCookies).forEach(([key, cookie]) => {
            if (!cookie.value) {
                return c.json(
                    {
                        message: "no cookie value provided for cookie: " + key,
                        error: "ERROR FROM DUMMY SERVER: no cookie value provided for cookie: " + key,
                    },
                    HTTP_STATUS.INTERNAL_SERVER_ERROR
                );
            }

            setCookie(c, key, cookie.value, {
                path: cookie.path,
                httpOnly: cookie.httpOnly,
                maxAge: cookie.maxAge,
                secure: cookie.secure,
                sameSite: cookie.sameSite,
            });
        });
    }

    // if no error occur then return response
    // @ts-ignore
    return c.json(apiConfig.response, apiConfig.responseStatus); // for some reason apiConfig.responseStatus is giving type error (type of apiConfig.responseStatus is number) for no reason, so ignoring it for now.
});

app.get("/test", async (c) => {
    return c.json({ id: 123, name: "test", email: "test@test" }, 200);
});

export default {
    port: config?.api?.port || 3001,
    fetch: app.fetch,
};
