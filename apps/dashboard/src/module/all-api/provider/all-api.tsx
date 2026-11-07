/* 
============================================================
this context provider is used at @/app/(frontend)/layout.tsx
=============================================================
*/

"use client";
import readYaml from "@/lib/read-ymal";
import { apiType } from "@workspace/types/api-type";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { DUMMY_PATH, CONFIG_PATH, REST_PATH, GET_PATH, POST_PATH, PUT_PATH, PATCH_PATH, DELETE_PATH } from "@workspace/util/constant";

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

type contextType = {
    api: { id: number; api: string; method: string }[];
    getApi: apiType;
    postApi: apiType;
    putApi: apiType;
    patchApi: apiType;
    deleteApi: apiType;
    apiList: apiListType;
    loading: boolean;
};

const allApiContext = createContext<contextType>({} as contextType);

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

export function AllApiProvider({ children }: { children: ReactNode }) {
    const [getApi, setGetApi] = useState<apiType>({} as apiType);
    const [postApi, setPostApi] = useState<apiType>({} as apiType);
    const [putApi, setPutApi] = useState<apiType>({} as apiType);
    const [patchApi, setPatchApi] = useState<apiType>({} as apiType);
    const [deleteApi, setDeleteApi] = useState<apiType>({} as apiType);
    const [apiList, setApiList] = useState<apiListType>({} as apiListType);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const [getApiData, postApiData, putApiData, patchApiData, deleteApiData] = await Promise.all([
                readYaml(GET_PATH),
                readYaml(POST_PATH),
                readYaml(PUT_PATH),
                readYaml(PATCH_PATH),
                readYaml(DELETE_PATH),
            ]);

            setPostApi(postApiData);
            setPutApi(putApiData);
            setPatchApi(patchApiData);
            setDeleteApi(deleteApiData);
            setGetApi(getApiData);

            const apiListData: apiListType = { get: [], post: [], put: [],patch: [], delete: [], all: [] };

            Object.entries(getApiData).forEach(([key, value]) => {
                apiListData.all.push({
                    api: key,
                    method: value.method,
                });
                apiListData.get.push({
                    api: key,
                    method: value.method,
                });
            });
            Object.entries(postApiData).forEach(([key, value]) => {
                apiListData.all.push({
                    api: key,
                    method: value.method,
                });
                apiListData.post.push({
                    api: key,
                    method: value.method,
                });
            });
            Object.entries(putApiData).forEach(([key, value]) => {
                apiListData.all.push({
                    api: key,
                    method: value.method,
                });
                apiListData.put.push({
                    api: key,
                    method: value.method,
                });
            });
            Object.entries(patchApiData).forEach(([key, value]) => {
                apiListData.all.push({
                    api: key,
                    method: value.method,
                });
                apiListData.patch.push({
                    api: key,
                    method: value.method,
                });
            })
            Object.entries(deleteApiData).forEach(([key, value]) => {
                apiListData.all.push({
                    api: key,
                    method: value.method,
                });
                apiListData.delete.push({
                    api: key,
                    method: value.method,
                });
            });

            setApiList(apiListData);
            setLoading(false);
        })();
    }, []);

    return (
        <allApiContext.Provider
            value={{
                api,
                getApi,
                postApi,
                putApi,
                patchApi,
                deleteApi,
                apiList,
                loading,
            }}
        >
            {children}
        </allApiContext.Provider>
    );
}

export function useAllApi() {
    return useContext(allApiContext);
}
