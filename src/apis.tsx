const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import { DeviceDetailInterface, DeviceInfo } from "./interface";


export const getDevices = async (): Promise<DeviceInfo[] | null> => {

    try {

        let resp = await fetch(BASE_URL+"/device/all/", {
            method: "GET", 
            headers: {
                "content": "application/json",
                "Authorization": localStorage.getItem("token")
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
                "content": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        
        let json: DeviceDetailInterface = await resp.json();
        console.log(json,"====")
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
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
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



export const login = async (email: string,password: string): Promise<string | null> => {
    try {

        let resp = await fetch(BASE_URL+"/auth/login", {
            method: "POST", 
            headers: {
                "content": "application/json"
            },
            body: new URLSearchParams({
                "email": "swapnil@gmail.com",
                "password": "Swapnil"
            })
        });

        if (resp.status === 200) {
            let jsn = await resp.json();
            localStorage.setItem("token",jsn.token);
            return jsn.token;
        }

        return null;


    } catch(e: any) {

        console.log(e)
        return null

    }


}


export const checkLogin = async (): Promise<boolean> => {
    try {

        let resp = await fetch(BASE_URL+"/auth/me", {
            method: "GET", 
            headers: {
                "content": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        if (resp.status === 200) {
            return true;
        }

        return false;


    } catch(e: any) {

        console.log(e)
        return null

    }


}