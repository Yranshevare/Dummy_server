import { Route, Routes } from "react-router-dom";
import Get from "./modules/get/ui/get";

const pages = [
    { path: "/", title: "All APIs", element: <Get/> },
    { path: "/get", title: "GET", element: <Get/> },
    { path: "/post", title: "POST", element: <Get/> },
    { path: "/put", title: "PUT", element: <Get/> },
    { path: "/patch", title: "PATCH", element: <Get/> },
    { path: "/delete", title: "DELETE", element: <Get/> },
];

function ApiPage({ title }: { title: string }) {
    return <h1 className="p-6 text-2xl font-bold">{title}</h1>;
}

export default function App() {
    return (
        <Routes>
            {pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<ApiPage title="Page not found" />} />
        </Routes>
    );
}
