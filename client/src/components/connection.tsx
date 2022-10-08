import {  cdsRequest } from "../authConfig";
import { msalInstance } from "../index";

export async function initDataverseConnection() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenPopup({
        ...cdsRequest,
        account: account
    });


    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;
    console.log(bearer);
    headers.append("Authorization", bearer);
    headers.append("OData-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("https://org86e364ee.crm10.dynamics.com/api/data/v9.2/WhoAmI", options);
}


export async function fetchMetadata() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenSilent({
        ...cdsRequest,
        account: account
    });


    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;
    console.log(bearer);
    headers.append("Authorization", bearer);
    headers.append("OData-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("https://org86e364ee.crm10.dynamics.com/api/data/v9.2/accounts", options).then((res)=> console.log(res)).catch(error => console.log(error));
}

