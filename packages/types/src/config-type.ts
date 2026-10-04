import { z } from "zod";

const dataType = z.object({
    port: z.number(),
});

const ConfigSchema = z.object({
    api: dataType,
    dashboard: dataType,
});

type ConfigType = z.infer<typeof ConfigSchema>;

export type { ConfigType };
export { ConfigSchema };
