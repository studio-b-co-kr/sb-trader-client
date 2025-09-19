import { useState } from "react";
import { useCreateCampaignOrder } from "@/hooks/useCampaignOrder";

import {
  Card,
  CardHeader,
} from "@/components/ui/card"

import {
  Input,
} from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Button,
} from "@/components/ui/button"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface NewTradeCardProps {
  campaignId: String;
  campaignToken: string;
}

export default function NewTradeCard({ campaignId, campaignToken }: NewTradeCardProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState<number>(0);

  const { mutate: createOrder, isLoading } = useCreateCampaignOrder();

  const handleSubmit = (side: "buy" | "sell") => {
    createOrder({
      campaign_id: campaignId,
      exchange: "bithumb",
      symbol: `KRW-${campaignToken}`,
      order_type: orderType,
      side,
      order_price: price,
      order_quantity: quantity,
    });
  };

  return (
    <Card className="dark rounded-[2px] overflow-hidden">
      <CardHeader className="color-[#FAFAFA]">
        New Trade
      </CardHeader>
      <Tabs defaultValue="buy" className="px-6">
        <TabsList>
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <div className="space-y-6 py-6">
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">{campaignToken} Quantity</div>
              <Input
                type="number"
                placeholder="Enter quantity"
                className="number-font"
                value={quantity || ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Order Type</div>
              <Select value={orderType} onValueChange={(val) => setOrderType(val as "limit" | "market")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="limit">Limit</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
{/*              <div className="flex flex-row gap-2">
                <div className="text-xs uppercase text-[#FAFAFA]/30">Market Price</div>
                <div className="text-xs number-font">$100</div>
              </div>*/}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Price</div>
              <Input
                type="number"
                placeholder="Price"
                className="number-font"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <Button
              onClick={handleSubmit("buy")}
              variant="outline"
              size="lg"
              className="w-full uppercase number-font"
              disabled={isLoading}
            >
              Place Buy Order
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="sell">
          <div className="space-y-6 py-6">
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">{campaignToken} Quantity</div>
              <Input
                type="number"
                placeholder="Enter quantity"
                className="number-font"
                value={quantity || ""}
                onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Order Type</div>
              <Select value={orderType} onValueChange={(val) => setOrderType(val as "limit" | "market")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="limit">Limit</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
{/*              <div className="flex flex-row gap-2">
                <div className="text-xs uppercase text-[#FAFAFA]/30">Market Price</div>
                <div className="text-xs number-font">$100</div>
              </div>*/}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Price</div>
              <Input
                type="number"
                placeholder="Price"
                className="number-font"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
{/*            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Order Value</div>
              <Input type="number" placeholder="Value" className="number-font" />
            </div>*/}
            <Button
              onClick={() => handleSubmit("sell")}
              variant="outline"
              size="lg"
              className="w-full uppercase number-font"
              disabled={isLoading}
            >
              {isLoading ? "Placing..." : "Place Sell Order"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}