
import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
    const { instance } = useMsal();
    const handleLogout = (logoutType: string) => {

        if (logoutType === "popup") {
            instance.logoutPopup({
                mainWindowRedirectUri: "/"
            });
        } 
    }

    return (
        <button className="btn-sm" onClick={() => handleLogout("popup")} key="logoutPopup">Logout</button>
    )
};