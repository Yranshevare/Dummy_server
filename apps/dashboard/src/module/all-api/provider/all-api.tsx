/* 
============================================================
this context provider is used at @/app/(frontend)/layout.tsx
=============================================================
*/

"use client";
import { apiType } from "@workspace/types/api-type";
import { createContext, useContext, useState, ReactNode } from "react";


type contextType = {
    api: { id: number; api: string; method: string }[];
    getApi: apiType;
    postApi: apiType;
    putApi: apiType;
    deleteApi: apiType;
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
    const [deleteApi, setDeleteApi] = useState<apiType>({} as apiType);

    return (
        <allApiContext.Provider
            value={{
                api,
                getApi,
                postApi,
                putApi,
                deleteApi,
            }}
        >
            {children}
        </allApiContext.Provider>
    );
}


export function useAllApi() {
    return useContext(allApiContext);
}