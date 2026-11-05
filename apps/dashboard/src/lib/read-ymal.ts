import { yamlParser } from "@workspace/util/yaml-parser";

export default async function readYml(path: string) {
    try {
        return await yamlParser<any>(path);
    } catch (error) {
        throw new Error("Error reading YAML file");
    }
}
