type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  machineAuthToken?: string | null;
  devices: string[];
};

type Device = {
  id: number;
  address: string;
  machineId: string;
  userId: number;
  country: string;
  region: string;
  city: string;
  category: string;
  manufacturer: string;
  data: any;
};
