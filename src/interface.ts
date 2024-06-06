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

    // elite 440
  voltage_phase_1: number,
  voltage_phase_2: number,
  voltage_phase_3: number,
  voltage_phase_avg: number,

  current_phase_1: number,
  current_phase_2: number,
  current_phase_3: number,
  current_phase_avg: number,

  power_factor_phase_1: number,
  power_factor_phase_2: number,
  power_factor_phase_3: number,
  power_factor_phase_avg: number,

  active_power_phase_1: number,
  active_power_phase_2: number,
  active_power_phase_3: number,
  active_power_phase_avg: number,

  apparent_power_phase_1: number,
  apparent_power_phase_2: number,
  apparent_power_phase_3: number,
  apparent_power_phase_avg: number,

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