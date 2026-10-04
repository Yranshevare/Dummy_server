export default function matchDynamicRoute(ymlPattern: string, requestRoute: string) {
    const ymlRouteParts = ymlPattern.split("/").slice(1); // Remove the leading empty string from the split
    const apiRouteParts = requestRoute.split("/").slice(1); // Remove the leading empty string from the split

    if (ymlRouteParts.length !== apiRouteParts.length) {
        return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < ymlRouteParts.length; i++) {
        const routePart = ymlRouteParts[i];
        const pathPart = apiRouteParts[i];

        console.log(routePart, pathPart); // Debugging line to check the values of routePart and pathPart

        if (!routePart || !pathPart) {
            return null;
        }

        // Dynamic parameter: :id, :userId, etc.
        if (routePart.startsWith(":")) {
            const paramName = routePart.slice(1); // Remove the leading ":"

            params[paramName] = pathPart;
            continue;
        }

        // Static part must match exactly
        if (routePart !== pathPart) {
            return null;
        }
    }

    return params;
}
