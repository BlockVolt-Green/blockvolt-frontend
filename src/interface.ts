export interface DeviceInfo {
    id: number,
    address: string,
    machineId: string,
    userId: number
}

export interface NotarizedData {
    id: number,
    deviceId: number,
    time: string,
    temprature: string,
    totalEnergy: string,
    today: string,
    power: number,
    apparentPower: number,
    reactivePower: number,
    factor: string,
    voltage: number,
    current: string,
    raw: string
}


export interface DeviceDetailInterface {
    id: number,
    address: string,
    machineId: string,
    userId: number
    data: NotarizedData[]
}

export interface NFT {
    tokenid: number,
    image: string,
    external_url: string,
    description: string,
    attributes: {
        cid: string,
        energy: number,
        location: string,
        machine_address: string,
        machine_cid: string,
        provider: string,
        timestamp: string
    }
}