type allowMethods = "get" | "post" | "put" | "patch" | "delete" | "all"

type ListType = {
    api: string;
    method: allowMethods;
};

type apiListType = {
    [K in allowMethods]: ListType[];
};

export type { allowMethods, ListType, apiListType };