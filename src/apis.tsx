const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import { DeviceInfo } from "./interface";

export const getDevices = async (): Promise<Device[] | null> => {
  try {
    const resp = await fetch(BASE_URL + "/device/all/", {
      method: "GET",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const json: Device[] = await resp.json();
    console.log(json)
    return json;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export const addDevice = async (
  address: string,
  machineId: string
): Promise<DeviceInfo[] | null> => {
  try {
    console.log(address, machineId);
    let resp = await fetch(BASE_URL + "/device/add", {
      method: "POST",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: new URLSearchParams({
        address: address,
        machineId: machineId,
      }),
    });

    console.log(resp.status);

    if (resp.status === 201) {
      let json: DeviceInfo[] = await resp.json();
      console.log(json);
      return json;
    } else {
      return null;
    }
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export const deleteDevice = async (deviceId: string) => {
  try {
    await fetch(BASE_URL + "/device/delete", {
      method: "POST",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: new URLSearchParams({
        id: deviceId,
      }),
    });
  } catch (e: any) {
    console.log(e);
  }
};

export const getDeviceDetail = async (
  address: string
): Promise<Device | null> => {
  try {
    const resp = await fetch(BASE_URL + "/device/?address=" + address, {
      method: "GET",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const json: Device = await resp.json();

    return json;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export const verifyData = async (
  address: string,
  data: string
): Promise<boolean | null> => {
  try {
    let resp = await fetch(BASE_URL + "/notarize/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        address,
        data,
      }),
    });

    let json: any = await resp.json();

    console.log(json);

    return json;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    let resp = await fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        content: "application/json",
      },
      body: new URLSearchParams({
        email: email,
        password: password,
      }),
    });

    if (resp.status === 200) {
      let jsn = await resp.json();
      console.log(jsn)
      localStorage.setItem("token", jsn.token);
      return jsn.token;
    }

    return null;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export const register = async (
  name: string,
  publicKey: string,
  email: string,
  password: string
): Promise<number> => {
  try {
    let resp = await fetch(BASE_URL + "/auth/register", {
      method: "POST",
      headers: {
        content: "application/json",
      },
      body: new URLSearchParams({
        name: name,
        publicKey: publicKey,
        email: email,
        password: password,
      }),
    });
    
    return resp.status
  } catch (e: any) {
    console.log(e);
    return 500;
  }
};

export const checkLogin = async (): Promise<boolean> => {
  try {
    let resp = await fetch(BASE_URL + "/auth/me", {
      method: "GET",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (resp.status === 200) {
      return true;
    }

    return false;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};


export const verifyCID = async (cid: string): Promise<boolean> => {
  try {
    let resp = await fetch(BASE_URL + "/notarize/verify-cid?cid=" + cid, {
      method: "GET",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (resp.status === 200) {
      return true;
    }

    return false;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};
