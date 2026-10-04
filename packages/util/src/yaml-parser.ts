import { readFile } from "node:fs/promises";
import YAML from "yaml";

export async function yamlParser<T>(filePath: string): Promise<T> {
    try {
        const file = await readFile(filePath, "utf-8");
        return YAML.parse(file) as T;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
