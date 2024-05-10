const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import { DeviceDetailInterface, DeviceInfo } from "./interface";

export const getDevices = async (): Promise<DeviceInfo[] | null> => {

    try {

        let resp = await fetch(BASE_URL+"/device/all/", {
            method: "GET", 
            headers: {
                "content": "application/json"
            }
        });
        
        let json: DeviceInfo[] = await resp.json();
        return json


    } catch(e: any) {

        console.log(e)
        return null

    }

}


export const getDeviceDetail = async (address: String): Promise<DeviceDetailInterface | null> => {

    try {

        let resp = await fetch(BASE_URL+"/device/?address="+address, {
            method: "GET", 
            headers: {
                "content": "application/json"
            }
        });
        
        let json: DeviceDetailInterface = await resp.json();
        return json


    } catch(e: any) {

        console.log(e)
        return null

    }

}



export const verifyData = async (address: string, data: string): Promise<boolean | null> => {

    try {
        
        let resp = await fetch(BASE_URL+"/notarize/verify/", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address,
                data
            })
        });
        
        let json: any = await resp.json();

        console.log(json)

        return json

    } catch(e: any) {

        console.log(e)
        return null

    }

}

