import { useContext, useMemo } from "react";
import { AppContext } from "../context/appContext";

export default function useContentMap() {
    const appContext = useContext(AppContext);

    const content = useMemo(() => {
        const contentMap = {}
        appContext.content.forEach(({id, markup}) => {
            contentMap[id] = markup;
        });
        return contentMap;
    }, [appContext.content]);

    return content || null;
}