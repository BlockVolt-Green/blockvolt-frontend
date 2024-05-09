export interface DeviceInfo {
    id: number,
    address: string,
    machineId: string,
    userId: number
}

export interface NotarizedData {
    id: number,
    deviceId: number,
    time: String,
    temprature: String,
    totalEnergy: String,
    today: String,
    power: number,
    apparentPower: number,
    reactivePower: number,
    factor: String,
    voltage: number,
    current: String,
    raw: String
}


export interface DeviceDetailInterface {
    id: number,
    address: string,
    machineId: string,
    userId: number
    data: NotarizedData[]
}