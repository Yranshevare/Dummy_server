import { AlertCircle, ChevronDown } from "lucide-react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useState } from "react";
import { ErrorConfig } from "../type";

export default function ErrorEditor({ title, value, onChange }: { title: string; value: ErrorConfig; onChange: (value: ErrorConfig) => void }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border border-red-100 rounded-lg overflow-hidden bg-red-50/30">
            <button type="button" onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between px-3 py-2.5 text-left">
                <span className="flex items-center gap-2 text-xs font-semibold text-red-700">
                    <AlertCircle size={14} />
                    {title}
                </span>

                <ChevronDown size={15} className={`text-red-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>

            {expanded && (
                <div className="p-3 border-t border-red-100 space-y-3">
                    <TextInput
                        label="Response Status"
                        type="number"
                        value={value.responseStatus}
                        onChange={(v) =>
                            onChange({
                                ...value,
                                responseStatus: Number(v),
                            })
                        }
                        placeholder="400"
                    />

                    <TextArea
                        label="Error Response Body"
                        value={typeof value.body === "string" ? value.body : JSON.stringify(value.body ?? "", null, 2)}
                        onChange={(v) => onChange({ ...value, body: v })}
                        placeholder='{"message": "Invalid input"}'
                    />
                </div>
            )}
        </div>
    );
}
