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
  campaignToken: string;
}

export default function NewTradeCard({ campaignToken }: NewTradeCardProps) {
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
              <Input type="number" placeholder="Enter quantity" className="number-font" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Price</div>
              <Select>
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
              <div className="flex flex-row gap-2">
                <div className="text-xs uppercase text-[#FAFAFA]/30">Market Price</div>
                <div className="text-xs number-font">$100</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Limit Price</div>
              <Input type="number" placeholder="Price" className="number-font" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Order Value</div>
              <Input type="number" placeholder="Value" className="number-font" />
            </div>
            <Button variant="outline" size="lg" className="w-full uppercase number-font">Make Trade</Button>
          </div>
        </TabsContent>
        <TabsContent value="sell">
          sell
        </TabsContent>
      </Tabs>
    </Card>
  )
}