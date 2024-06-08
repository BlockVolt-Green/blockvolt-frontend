import { getDeviceDetail, verifyData } from "@/apis";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Icons } from "@/components/icons";
import { NotarizedData } from "@/interface";

export default function DeviceDetail() {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<Device | null>(null);
  const { toast } = useToast();

  const verify = async (data: string) => {

    // let timediff = getSecondsDifference(timestamp);
    // console.log(timediff)
    // if (timediff < 20) {
    //   toast({
    //     title: "Data Notarizing",
    //     description: "wait for few seconds",
    //   });
    //   return;
    // }

    const res = await verifyData(address, data);

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

  async function getData() {
    try {
      setIsLoading(true);

      const apiData = await getDeviceDetail(address);

      if (apiData !== null) {
        setData(apiData);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {

    getData();

  }, [address]);

  if (data === null) {
    return
  }

  return (

    <DashboardLayout loading={isLoading}>
      <Card className="w-[95%]">
        <CardHeader>
          <CardTitle>Device {data.category.toUpperCase()} - {data.manufacturer.toUpperCase()}</CardTitle>
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
            <strong>Location: </strong> {data?.city.toUpperCase()}, {data?.region.toUpperCase()} - {data?.country}
          </p>
          <p className="text-sm ">
            <strong>User ID: </strong> {data?.userId}
          </p>
        </CardContent>
      </Card>


      {
        data.meter_phase === "elite"
          ? (
            <Table>
              <TableCaption>A list of all Notarized data device {data?.category.toUpperCase()} - {data?.manufacturer.toUpperCase()}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Data ID</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Voltage Phase Avg</TableHead>
                  <TableHead>Current Phase Avg</TableHead>
                  <TableHead>Power Factor Phase Avg</TableHead>
                  <TableHead>Active Power Phase Avg</TableHead>
                  <TableHead>Apparent Power Phase Avg</TableHead>
                  <TableHead>Info</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.data.map((item: NotarizedData) => (
                  <TableRow key={item?.id}>
                    <TableCell className="font-medium">{item?.id}</TableCell>
                    <TableCell>
                      {new Date(item?.time.toString()).toLocaleString(undefined, {
                        timeZone: "Asia/Kolkata",
                      })}
                    </TableCell>
                    <TableCell>{parseFloat(item?.voltage_phase_avg.toString()).toFixed(3)} V</TableCell>
                    <TableCell>{parseFloat(item?.current_phase_avg.toString()).toFixed(3)} A</TableCell>
                    <TableCell>{parseFloat(item?.power_factor_phase_avg.toString()).toFixed(3)} kWh</TableCell>
                    <TableCell>{parseFloat(item?.active_power_phase_avg.toString()).toFixed(3)} kWh</TableCell>
                    <TableCell>{item?.apparent_power_phase_avg} kWh</TableCell>


                    <TableCell>
                      <Button
                        onClick={() => verify(item.raw.toString())}
                        className="rounded-lg mr-2"
                      >
                        <Icons.check className="h-4 w-4" />
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )

          : (
            <Table>
              <TableCaption>A list of all Notarized data device {data?.category.toUpperCase()} - {data?.manufacturer.toUpperCase()}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Data ID</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Total Energy</TableHead>
                  <TableHead>Today</TableHead>
                  <TableHead>Power Factor</TableHead>
                  <TableHead>Voltage</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Info</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.data.map((item: NotarizedData) => (
                  <TableRow key={item?.id}>
                    <TableCell className="font-medium">{item?.id}</TableCell>
                    <TableCell>
                      {new Date(item?.time.toString()).toLocaleString(undefined, {
                        timeZone: "Asia/Kolkata",
                      })}
                    </TableCell>
                    <TableCell>{parseFloat(item?.totalEnergy).toFixed(3)} kWh</TableCell>
                    <TableCell>{parseFloat(item?.today).toFixed(3)} kWh</TableCell>
                    <TableCell>{item?.power} W</TableCell>
                    <TableCell>{item?.voltage} V</TableCell>
                    <TableCell>{item?.current} A</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => verify(item.raw.toString())}
                        className="rounded-lg mr-2"
                      >
                        <Icons.check className="h-4 w-4" />
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
      }


    </DashboardLayout>
  );
}
