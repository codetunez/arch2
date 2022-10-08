import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId:  "1ff5cabb-5a1d-4d81-a1da-3bb7386e50cb",//"d2a780d5-5ea7-4f7f-8f83-16a299578f3c",//"75eb2b80-011a-4693-9a47-7971c853603c",//"d2a780d5-5ea7-4f7f-8f83-16a299578f3c",
        authority: "https://login.windows.net/common",
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ["User.Read", "https://admin.services.crm.dynamics.com/user_impersonation"]
};

//"https://org86e364ee.crm10.dynamics.com/.default"
export const cdsRequest: PopupRequest = {
    scopes: ["https://org86e364ee.crm10.dynamics.com/.default"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};