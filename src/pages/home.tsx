import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDevices } from "@/apis";
import { useEffect, useState } from "react";
import { DeviceInfo } from "@/interface";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/main-layout";

export default function Home() {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const navigate = useNavigate();

  const fetchDevices = async () => {
    const devices = await getDevices();

    if (devices) {
      setDevices(devices);
    } else {
      console.log("devices are null");
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <MainLayout>
      <div className="container">
        <h1>Home</h1>

        <div className="flex justify-around p-10">
          {devices.map((item) => {
            return (
              <Card
                className="w-[25%]"
                onClick={() =>
                  navigate("/device-detail", {
                    state: { address: item.address },
                  })
                }
              >
                <CardHeader>
                  <CardTitle>Device {item.id}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-left">
                    <strong>Address: </strong> {item.address.slice(0, 20)}...
                  </p>
                  <p className="text-sm text-left">
                    <strong>Machine Id: </strong> {item.machineId.slice(0, 16)}
                    ...
                  </p>
                  <p className="text-sm text-left">
                    <strong>User ID: </strong> {item.userId}
                  </p>
                  s
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
