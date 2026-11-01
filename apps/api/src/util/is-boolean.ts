export default function isBoolean(str: string): boolean {
    if (str === "true" || str === "false") {
        return true;
    } else {
        return false;
    }
}