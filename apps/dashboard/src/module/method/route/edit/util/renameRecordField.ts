export default function renameRecordField<T>(data: Record<string, T>, oldKey: string, newKey: string): Record<string, T> {
    const key = newKey.trim();

    if (!key || key === oldKey || key in data) return data;

    const result: Record<string, T> = {};

    Object.entries(data).forEach(([k, v]) => {
        result[k === oldKey ? key : k] = v as T;
    });

    return result;
}