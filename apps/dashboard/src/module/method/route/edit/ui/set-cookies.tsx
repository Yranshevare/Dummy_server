import React from "react";
import removeRecordField from "../util/removeRecordField";
import renameRecordField from "../util/renameRecordField";
import TextInput from "./components/TextInput";
import { Trash2 } from "lucide-react";
import updateRecordField from "../util/updateRecordField";
import SelectInput from "./components/SelectInput";
import Toggle from "./components/Toggle";

export default function SetCookies({key, cookie, setSetCookies}: {key: string, cookie: any, setSetCookies: React.SetStateAction<(prev: any) => void>}) {
    return (
        <div key={key} className="p-4 border border-gray-200 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-800">Response Cookie</p>
                <button
                    type="button"
                    onClick={() => setSetCookies((prev) => removeRecordField(prev, key))}
                    className="text-gray-400 hover:text-red-600"
                >
                    <Trash2 size={15} />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextInput
                    label="Cookie Name"
                    value={key}
                    onChange={(v) => setSetCookies((prev) => renameRecordField(prev, key, v))}
                    placeholder="token"
                />

                <TextInput
                    label="Cookie Value"
                    value={cookie.value}
                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, value: v }))}
                    placeholder="Cookie value"
                />

                <TextInput
                    label="Path"
                    value={cookie.path ?? ""}
                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, path: v || undefined }))}
                    placeholder="/"
                />

                <TextInput
                    label="Max Age (seconds)"
                    type="number"
                    value={cookie.maxAge ?? ""}
                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, maxAge: v === "" ? undefined : Number(v) }))}
                    placeholder="3600"
                />

                <SelectInput
                    label="Same Site"
                    value={cookie.sameSite || "lax"}
                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, sameSite: v }))}
                    options={["strict", "lax", "none"]}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Toggle
                    label="HTTP Only"
                    checked={!!cookie.httpOnly}
                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, httpOnly: v }))}
                />

                <Toggle
                    label="Secure"
                    checked={!!cookie.secure}
                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, secure: v }))}
                />
            </div>
        </div>
    );
}
