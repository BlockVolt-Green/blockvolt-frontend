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