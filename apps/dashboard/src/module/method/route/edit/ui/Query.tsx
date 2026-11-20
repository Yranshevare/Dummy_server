import { Trash2 } from "lucide-react";
import React from "react";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import Toggle from "./components/Toggle";
import ErrorEditor from "./components/ErrorEditor";
import updateRecordField from "../util/updateRecordField";
import makeError from "../util/makeError";
import renameRecordField from "../util/renameRecordField";
import removeRecordField from "../util/removeRecordField";

export default function Query({ key, field, setQuery }: { key: string; field: any; setQuery: React.SetStateAction<(prev: any) => void> }) {
    return (
        <div key={key} className="p-4 border border-gray-200 rounded-lg space-y-4">
            <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-gray-800">Query Field</p>

                <button type="button" onClick={() => setQuery((prev) => removeRecordField(prev, key))} className="text-gray-400 hover:text-red-600">
                    <Trash2 size={15} />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextInput label="Field Name" value={key} onChange={(v) => setQuery((prev) => renameRecordField(prev, key, v))} placeholder="page" />

                <SelectInput
                    label="Data Type"
                    value={field.type?.type || "string"}
                    onChange={(v) =>
                        setQuery((prev) =>
                            updateRecordField(prev, key, {
                                ...field,
                                type: {
                                    ...field.type,
                                    type: v,
                                    error: field.type?.error || makeError(),
                                },
                            })
                        )
                    }
                    options={["string", "number", "boolean"]}
                />
            </div>

            <Toggle
                label="Required"
                checked={field.required}
                onChange={(v) => setQuery((prev) => updateRecordField(prev, key, { ...field, required: v }))}
            />

            <ErrorEditor
                title="Query Validation Error"
                value={field.error || makeError()}
                onChange={(v) => setQuery((prev) => updateRecordField(prev, key, { ...field, error: v }))}
            />

            <ErrorEditor
                title="Type Validation Error"
                value={field.type?.error || makeError()}
                onChange={(v) =>
                    setQuery((prev) =>
                        updateRecordField(prev, key, {
                            ...field,
                            type: { ...field.type, error: v },
                        })
                    )
                }
            />
        </div>
    );
}
