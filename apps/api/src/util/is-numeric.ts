export default function isNumeric(str: string): boolean {
    if (/^\d+$/.test(str)) {
        return true;
    } else {
        return false;
    }
}