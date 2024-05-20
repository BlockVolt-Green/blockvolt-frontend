import { getDeviceDetail, verifyData } from "@/apis";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeviceDetailInterface } from "@/interface";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function DeviceDetail() {
  const { state } = useLocation();
  const { address } = state;
  const [data, setData] = useState<DeviceDetailInterface | null>(null);
  const { toast } = useToast();

  const getData = async () => {
    let apiData = await getDeviceDetail(address);

    if (apiData !== null) {
      setData(apiData);
    }
  };

  const verify = async (data: string) => {
    let res = await verifyData(address, data);

    if (res === false) {
      toast({
        title: "Invalid Data",
        description: "Data is invalid/fraud",
      });
    } else {
      toast({
        title: "Valid Data",
        description: "Data is Verified",
      });
    }
  };

  useEffect(() => {
    getData();
    verifyData(address, "dasd");
  }, []);

  return (
    <>
      <Card className="w-[95%]">
        <CardHeader>
          <CardTitle>Device {data?.id}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm ">
            <strong>Address: </strong> {data?.address}
          </p>
          <p className="text-sm ">
            <strong>Machine Id: </strong> {data?.machineId}
          </p>
          <p className="text-sm ">
            <strong>User ID: </strong> {data?.userId}
          </p>
        </CardContent>
      </Card>

      <div className="w-full flex flex-col items-center mt-10">
        {data?.data.map((item) => {
          return (
            <Card className="w-[25%] my-3">
              <CardHeader></CardHeader>
              <CardContent>
                <p className="text-sm ">
                  <strong>Id: </strong> {item?.id}
                </p>
                <p className="text-sm ">
                  <strong>Device Id: </strong> {item?.deviceId}
                </p>
                <p className="text-sm ">
                  <strong>Time: </strong> {item?.time}
                </p>
                <p className="text-sm ">
                  <strong>Temprature: </strong> {item?.temprature}
                </p>
                <p className="text-sm ">
                  <strong>Total Energy: </strong> {item?.totalEnergy}
                </p>
                <p className="text-sm ">
                  <strong>Today: </strong> {item?.today}
                </p>
                <p className="text-sm ">
                  <strong>Power: </strong> {item?.power}
                </p>
                <p className="text-sm ">
                  <strong>Voltage: </strong> {item?.voltage}
                </p>
                <p className="text-sm ">
                  <strong>Current: </strong> {item?.current}
                </p>
              </CardContent>
              <CardFooter className="flex w-full justify-center items-center">
                <Button onClick={() => verify(item.raw.toString())}>
                  Verify
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}
