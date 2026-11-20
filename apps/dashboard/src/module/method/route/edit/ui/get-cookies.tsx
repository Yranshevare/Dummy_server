import React from "react";
import removeRecordField from "../util/removeRecordField";
import renameRecordField from "../util/renameRecordField";
import SelectInput from "./components/SelectInput";
import updateRecordField from "../util/updateRecordField";
import { Trash2 } from "lucide-react";
import TextInput from "./components/TextInput";
import Toggle from "./components/Toggle";
import makeError from "../util/makeError";
import ErrorEditor from "./components/ErrorEditor";

export default function GetCookies({key, cookie, setGetCookies}:{key:string, cookie: any, setGetCookies: React.SetStateAction<(prev:any) => void>}) {
    return (
        <div key={key} className="p-4 border border-gray-200 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-800">Cookie</p>
                <button
                    type="button"
                    onClick={() => setGetCookies((prev) => removeRecordField(prev, key))}
                    className="text-gray-400 hover:text-red-600"
                >
                    <Trash2 size={15} />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextInput
                    label="Cookie Name"
                    value={key}
                    onChange={(v) => setGetCookies((prev) => renameRecordField(prev, key, v))}
                    placeholder="sessionId"
                />

                <SelectInput
                    label="Data Type"
                    value={cookie.type?.type || "string"}
                    onChange={(v) =>
                        setGetCookies((prev) =>
                            updateRecordField(prev, key, {
                                ...cookie,
                                type: { ...cookie.type, type: v },
                            })
                        )
                    }
                    options={["string", "number", "boolean"]}
                />
            </div>

            <Toggle
                label="Required"
                checked={cookie.required}
                onChange={(v) => setGetCookies((prev) => updateRecordField(prev, key, { ...cookie, required: v }))}
            />

            <Toggle
                label="Enable Equals Validation"
                checked={!!cookie.equals}
                onChange={(v) =>
                    setGetCookies((prev) =>
                        updateRecordField(prev, key, {
                            ...cookie,
                            equals: v ? { value: "", error: makeError() } : undefined,
                        })
                    )
                }
            />

            {cookie.equals && (
                <>
                    <TextInput
                        label="Expected Value"
                        value={cookie.equals.value}
                        onChange={(v) =>
                            setGetCookies((prev) =>
                                updateRecordField(prev, key, {
                                    ...cookie,
                                    equals: { ...cookie.equals, value: v },
                                })
                            )
                        }
                    />

                    <ErrorEditor
                        title="Equals Error"
                        value={cookie.equals.error || makeError()}
                        onChange={(v) =>
                            setGetCookies((prev) =>
                                updateRecordField(prev, key, {
                                    ...cookie,
                                    equals: { ...cookie.equals, error: v },
                                })
                            )
                        }
                    />
                </>
            )}

            <ErrorEditor
                title="Cookie Error"
                value={cookie.error || makeError()}
                onChange={(v) => setGetCookies((prev) => updateRecordField(prev, key, { ...cookie, error: v }))}
            />

            <ErrorEditor
                title="Type Error"
                value={cookie.type?.error || makeError()}
                onChange={(v) =>
                    setGetCookies((prev) =>
                        updateRecordField(prev, key, {
                            ...cookie,
                            type: { ...cookie.type, error: v },
                        })
                    )
                }
            />
        </div>
    );
}
