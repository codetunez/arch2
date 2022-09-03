import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/appContext";

export const useSiteInformation = () => {
    const appContext: any = useContext(AppContext);

    const [currentSite, setCurrentSite] = useState(null);

    // eslint-disable-next-line no-restricted-globals
    const paths = location.pathname.split('/');
    useEffect(() => {
        setCurrentSite(appContext.sites.find(site => site.id === paths[2]));
    }, [appContext.sites, paths]);

    return currentSite || { engine: null, };
}