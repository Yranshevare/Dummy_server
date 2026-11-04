import { Route, Routes } from "react-router-dom";

const pages = [
    { path: "/", title: "All APIs" },
    { path: "/get", title: "GET" },
    { path: "/post", title: "POST" },
    { path: "/put", title: "PUT" },
    { path: "/patch", title: "PATCH" },
    { path: "/delete", title: "DELETE" },
];

function ApiPage({ title }: { title: string }) {
    return <h1 className="p-6 text-2xl font-bold">{title}</h1>;
}

export default function App() {
    return (
        <Routes>
            {pages.map(({ path, title }) => (
                <Route key={path} path={path} element={<ApiPage title={title} />} />
            ))}
            <Route path="*" element={<ApiPage title="Page not found" />} />
        </Routes>
    );
}
