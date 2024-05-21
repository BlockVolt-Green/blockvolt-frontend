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
import { Link } from "react-router-dom";

export default function AllDevicesPage() {
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
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {[
              {
                id: 1,
                address: "0x1234567890abcdef",
                machineid: "M123",
                userid: "U123",
                data: "Data",
              },
              {
                id: 2,
                address: "0x1234567890abcdef",
                machineid: "M123",
                userid: "U123",
                data: "Data",
              },
            ].map(({ id, address, machineid, userid, data }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell>{machineid}</TableCell>
                <TableCell>{userid}</TableCell>
                <TableCell>{data}</TableCell>
                <TableCell className="text-right">
                  <Link to={"/device-detail"} className="mr-2">
                    <Button className="rounded-full">
                      <Icons.info className="h-4 w-4" />
                    </Button>
                  </Link>

                  {/* <Button className="rounded-full" onClick={() => {}}>
                <Icons.trash className="h-4 w-4" />
              </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
