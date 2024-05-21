import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddDevicesPage() {
  return (
    <DashboardLayout loading={false}>
      <h1 className="text-3xl font-bold">Add Device</h1>

      <div className="flex flex-col gap-6 my-10 mx-4 p-8 max-w-sm">
        <div>
          <Label className="sr-only" htmlFor="machineid">
            Machine ID
          </Label>

          <Input
            id="machineid"
            placeholder="Machine ID"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            //   disabled={isLoading}
          />
        </div>

        <div>
          <Label className="sr-only" htmlFor="address">
            Address
          </Label>

          <Input
            id="address"
            placeholder="Address"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            //   disabled={isLoading}
          />
        </div>

        <div>
          <Button>Add Device</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
