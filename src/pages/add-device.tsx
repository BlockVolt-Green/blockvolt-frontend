import { addDevice } from "@/apis";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDevicesPage() {
  const machineIdRef = useRef<HTMLInputElement>();
  const addressRef = useRef<HTMLInputElement>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const device = await addDevice(
        addressRef.current.value,
        machineIdRef.current.value
      );

      if (device === null) {
        alert("Cannot add device");
        return;
      } else {
        navigate("/devices");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

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
            ref={machineIdRef}
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
            ref={addressRef}
          />
        </div>

        <div>
          <Button onClick={onSubmit} disabled={isLoading}>
            Add Device
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
