export default function addRecordField<T>(data: Record<string, T>, value: T): Record<string, T> {
    let key = "newField";
    let index = 1;

    while (key in data) {
        key = `newField${index++}`;
    }

    return { ...data, [key]: value };
}
