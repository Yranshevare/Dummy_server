const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

const inputClass =
    "w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-900/5 transition-all placeholder:text-gray-400";

const methodStyles: Record<string, string> = {
    get: "bg-green-50 text-green-700 border-green-200",
    post: "bg-blue-50 text-blue-700 border-blue-200",
    put: "bg-orange-50 text-orange-700 border-orange-200",
    patch: "bg-purple-50 text-purple-700 border-purple-200",
    delete: "bg-red-50 text-red-700 border-red-200",
};

const selectClass = "w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-gray-400";


export {labelClass, inputClass, methodStyles, selectClass}