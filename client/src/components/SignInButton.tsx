import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType: string) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest);
         } 
    }
    return (
            <button className="btn-sm" onClick={() => handleLogin("popup")} key="loginPopup">Sign in</button>
    )
};