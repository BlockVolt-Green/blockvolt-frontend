import { deleteDevice, getDevices } from "@/apis";
import { Icons } from "@/components/icons";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeviceInfo } from "@/interface";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AllDevicesPage() {

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
    <DashboardLayout loading={false}>
      <h1 className="text-3xl font-bold">All Devices</h1>

      <div>
        <Table>
          <TableCaption>A list of all available bids.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Machine ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead className="text-right">Info</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {devices.map(({ id, address, machineId, userId }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell>{machineId}</TableCell>
                <TableCell>{userId}</TableCell>
                <TableCell className="text-right">
                    <Button className="rounded-full"
                      onClick={() =>
                        navigate("/device-detail", {
                          state: { address: address },
                        })
                      }
                    >
                      <Icons.info className="h-4 w-4" />
                    </Button>
                </TableCell>

                <TableCell className="text-right">
                  <Button className="rounded-full text-red-500 bg-gray-200" onClick={() => {deleteDevice(id.toString())}}>
                  <Icons.trash className="h-4 w-4" />
                </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
