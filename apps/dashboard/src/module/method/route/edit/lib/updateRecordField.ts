export default function updateRecordField<T>(data: Record<string, T>, key: string, value: T): Record<string, T> {
    return { ...data, [key]: value };
}
