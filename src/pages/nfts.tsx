import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

export default function NFTPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DashboardLayout loading={isLoading}>
      <h1 className="text-3xl font-bold">Your NFTs</h1>

      <div className="flex flex-row gap-4 flex-wrap my-6">
        {Array(9)
          .fill("/images/sample-nft.webp")
          .map((nft, index) => (
            <Card className="p-4 w-[300px]">
              <img src={nft} alt={`NFT ${index}`} className="rounded-md" />
            </Card>
          ))}
      </div>
    </DashboardLayout>
  );
}
