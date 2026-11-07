type allowMethods = "get" | "post" | "put" | "patch" | "delete" | "all"

type ListType = {
    api: string;
    method: string;
};

type apiListType = {
    get: ListType[];
    post: ListType[];
    put: ListType[];
    patch: ListType[];
    delete: ListType[];
    all: ListType[];
};

export type { allowMethods, ListType, apiListType };