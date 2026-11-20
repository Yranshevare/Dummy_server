export default function removeRecordField<T>(data: Record<string, T>, key: string): Record<string, T> {
    const result = { ...data };
    delete result[key];
    return result;
}
