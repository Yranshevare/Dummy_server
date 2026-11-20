import { ErrorConfig } from "../type";

const defaultError: ErrorConfig = {
    body: "",
    responseStatus: 400,
};

export default function makeError(): ErrorConfig {
    return { ...defaultError };
}
