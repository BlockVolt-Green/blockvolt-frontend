import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDevices } from "@/apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function DashboardPage() {
  const [devices, setDevices] = useState<Device[]>([]);
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
    <DashboardLayout loading={false}>
      <div className="container">
        <div className="flex flex-wrap gap-4 p-10">

          {
            devices.length === 0 ?
            <p className="text-center w-full text-red-500 text-sm">No Registered Devices</p>
            :
            devices?.map((item) => {
              return (
                <Card
                  className="w-[400px] cursor-pointer"
                  onClick={() =>
                    navigate(`/device-detail?address=${item.address}`)
                  }
                >
                  <CardHeader>
                    <CardTitle>{item.category.toUpperCase()} - {item.manufacturer.toUpperCase()}</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
  
                  <CardContent className="text-md">
                    <p className="">
                      <strong>Address: </strong> {item.address.slice(0,20)}...
                    </p>
                    <p className="">
                      <strong>Machine Id: </strong> {item.machineId.slice(0,20)}...
                    </p>
                    <p className="">
                      <strong>Location: </strong> {item.city.toUpperCase()}, {item.region.toUpperCase()} - {item.country}
                    </p>
                    <p className="">
                      <strong>User ID: </strong> {item.userId}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          }

        </div>
      </div>
    </DashboardLayout>
  );
}
