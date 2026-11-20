import { Trash2 } from "lucide-react";
import React from "react";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import Toggle from "./components/Toggle";
import ErrorEditor from "./components/ErrorEditor";
import removeRecordField from "../util/removeRecordField";
import renameRecordField from "../util/renameRecordField";
import makeError from "../util/makeError";
import updateRecordField from "../util/updateRecordField";
import { labelClass } from "../style/style";

export default function Body({ key, field, setBody }: { key: string; field: any; setBody: React.SetStateAction<(prev: any) => void> }) {
    return (
        <div key={key} className="p-4 border border-gray-200 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-800">Body Field</p>

                <button type="button" onClick={() => setBody((prev) => removeRecordField(prev, key))} className="text-gray-400 hover:text-red-600">
                    <Trash2 size={15} />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextInput
                    label="Field Name"
                    value={key}
                    onChange={(v) => setBody((prev) => renameRecordField(prev, key, v))}
                    placeholder="username"
                />

                <SelectInput
                    label="Data Type"
                    value={field.type?.type || "string"}
                    onChange={(v) =>
                        setBody((prev) =>
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
                    options={["string", "number", "boolean", "json", "url"]}
                />
            </div>

            <Toggle
                label="Required"
                checked={field.required}
                onChange={(v) => setBody((prev) => updateRecordField(prev, key, { ...field, required: v }))}
            />

            {/* Equals */}
            <div className="border border-gray-100 rounded-lg p-3 space-y-3">
                <Toggle
                    label="Enable Equals Validation"
                    description="Require this field to match a specific value"
                    checked={!!field.equals}
                    onChange={(v) =>
                        setBody((prev) =>
                            updateRecordField(prev, key, {
                                ...field,
                                equals: v ? { value: "", error: makeError() } : undefined,
                            })
                        )
                    }
                />

                {field.equals && (
                    <>
                        <TextInput
                            label="Expected Value"
                            value={typeof field.equals.value === "string" ? field.equals.value : JSON.stringify(field.equals.value)}
                            onChange={(v) =>
                                setBody((prev) =>
                                    updateRecordField(prev, key, {
                                        ...field,
                                        equals: { ...field.equals, value: v },
                                    })
                                )
                            }
                            placeholder="Expected value"
                        />

                        <ErrorEditor
                            title="Equals Validation Error"
                            value={field.equals.error || makeError()}
                            onChange={(v) =>
                                setBody((prev) =>
                                    updateRecordField(prev, key, {
                                        ...field,
                                        equals: { ...field.equals, error: v },
                                    })
                                )
                            }
                        />
                    </>
                )}
            </div>

            {/* Nested body */}
            {field.type?.type === "json" && (
                <div>
                    <label className={labelClass}>Nested Properties (JSON)</label>

                    <textarea
                        key={key}
                        defaultValue={JSON.stringify(field.type.body || {}, null, 2)}
                        onBlur={(e) => {
                            try {
                                const nested = JSON.parse(e.target.value);

                                if (nested === null || typeof nested !== "object" || Array.isArray(nested)) {
                                    throw new Error("Expected an object");
                                }

                                setBody((prev) =>
                                    updateRecordField(prev, key, {
                                        ...field,
                                        type: {
                                            ...field.type,
                                            body: nested,
                                        },
                                    })
                                );
                            } catch {
                                e.target.setCustomValidity("Enter a valid JSON object.");
                                e.target.reportValidity();
                            }
                        }}
                        className="w-full min-h-28 p-3 rounded-lg border border-gray-200 text-xs font-mono outline-none focus:border-gray-400"
                        placeholder={'{\n  "name": {\n    "required": true\n  }\n}'}
                    />

                    <p className="text-[11px] text-gray-400 mt-1">Enter nested body fields as a JSON object using the body field structure.</p>
                </div>
            )}

            <ErrorEditor
                title="Body Field Error"
                value={field.error || makeError()}
                onChange={(v) => setBody((prev) => updateRecordField(prev, key, { ...field, error: v }))}
            />

            <ErrorEditor
                title="Data Type Error"
                value={field.type?.error || makeError()}
                onChange={(v) =>
                    setBody((prev) =>
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
