import { apiType } from "@workspace/types/api-type";
import { yamlParser } from "@workspace/util/yaml-parser";

export default async function readYaml(path: string): Promise<apiType> {
    try {
        return await yamlParser(path);
    } catch (error) {
        throw new Error("Error reading YAML file");
    }
}