import { createContext, useContext, useEffect, useState } from "react";
import readYml from "./read-ymal";
import { DELETE_PATH, GET_PATH, PATCH_PATH, POST_PATH, PUT_PATH } from "@workspace/util/constant";
import type { apiType } from "@workspace/types/api-type";

type contextType = {
    api:{id:number, api:string, method:string}[];
    getApi: apiType | undefined;
    postAPi: apiType | undefined;
    putApi: apiType | undefined;
    patchApi: apiType | undefined;
    deleteApi: apiType | undefined;
};

export const DataProviderContext = createContext<contextType | {}>({});

const api = [
    {
        id: 1,
        api: "/api/users",
        method: "GET",
    },
    {
        id: 2,
        api: "/api/users",
        method: "GET",
    },
    {
        id: 3,
        api: "/api/users",
        method: "GET",
    },
    {
        id: 4,
        api: "/api/users",
        method: "GET",
    },
];

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const [getApi, setGetAPI] = useState<apiType>();
    const [postAPi, setPostAPi] = useState<apiType>();
    const [putApi, setPutApi] = useState<apiType>();
    const [patchApi, setPatchApi] = useState<apiType>();
    const [deleteApi, setDeleteApi] = useState<apiType>();

    useEffect(() => {
        (async function () {
            const [GET, POST, PUT, PATCH, DELETE] = await Promise.all([
                await readYml(GET_PATH),
                await readYml(POST_PATH),
                await readYml(PUT_PATH),
                await readYml(PATCH_PATH),
                await readYml(DELETE_PATH),
            ]);

            setGetAPI(GET);
            setPostAPi(POST);
            setPutApi(PUT);
            setPatchApi(PATCH);
            setDeleteApi(DELETE);
        })();
    }, []);

    return <DataProviderContext.Provider value={{ api, getApi, postAPi, putApi, patchApi, deleteApi }}>{children}</DataProviderContext.Provider>;
}

export function useDataProvider() {
    return useContext(DataProviderContext);
}
