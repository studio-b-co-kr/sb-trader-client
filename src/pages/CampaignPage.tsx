import logoBlue from "@/assets/logo-blue.png"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Input,
} from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import TradingViewWidget from "@/components/chart/BlueChart"

interface CampaignPageProps {
  campaignId: string
}

const campaignToken = "Blue"

export default function CampaignPage({ campaignId }: CampaignPageProps) {
  return (
    <div className="container mx-auto max-w-9xl">
      <div className="flex flex-row justify-stretch gap-0 min-h-screen">
        <div className="flex-grow min-h-screen border-r border-[#B6A2B7]/20 pr-6 pt-6">
          <div className="mb-6 flex flex-row gap-8 items-center">
            <h1 className="text-3xl flex flex-row gap-1">
              <img src={logoBlue} alt="Logo" className="w-8 h-8" />
              <span className="lowercase">{campaignToken}</span>
              <span className="text-[#EE82DA] uppercase font-bold">{campaignToken}</span>
            </h1>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Current Price</div>
              <div className="text-lg number-font">$0.001728</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Volume</div>
              <div className="text-lg number-font">$8.55M</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Exchange</div>
              <div className="text-lg number-font">$10,000</div>
            </div>
          </div>

          <Card className="w-full h-[560px] dark rounded-[2px]">
            <div>
              <div className="text-[#FAFAFA] text-4xl number-font pl-6 mb-2">
                $0.0017281
              </div>
              <div className="text-[#EE82DA] text-normal number-font pl-6 flex flex-row gap-1">
                <div>+$0.000011232</div>
                <div>(+1.23%)</div>
              </div>
            </div>
            <TradingViewWidget />
          </Card>
          <Card className="w-full min-h-[400px] dark rounded-[2px] mt-6">
            <CardHeader className="color-[#FAFAFA]">
              Trades
            </CardHeader>
            <Tabs defaultValue="open" className="px-6">
              <TabsList>
                <TabsTrigger value="open">Open Trades</TabsTrigger>
                <TabsTrigger value="executed">Executed Trades</TabsTrigger>
              </TabsList>
           
              <TabsContent value="open">
                <div className="flex flex-row justify-start gap-x-16 pt-6 pb-12">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm uppercase text-[#FAFAFA]/30">Open Total</div>
                    <div className="text-normal number-font">$250</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm uppercase text-[#FAFAFA]/30">Open Sells</div>
                    <div className="text-normal number-font text-[#719ED2]">$150</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm uppercase text-[#FAFAFA]/30">Open Buys</div>
                    <div className="text-normal number-font text-[#DE999A]">$100</div>
                  </div>
                </div>
                <Table>
                  <TableCaption>Open Trades</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Input Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Direction</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Vol From Market</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="number-font">Input Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Direction</TableCell>
                      <TableCell className="text-right number-font">Price</TableCell>
                      <TableCell className="text-right number-font">Quantity</TableCell>
                      <TableCell className="text-right number-font">Total</TableCell>
                      <TableCell className="text-right number-font">Value</TableCell>
                      <TableCell className="text-right number-font">Amount</TableCell>
                      <TableCell className="text-right number-font">Vol From Market</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="executed">
                <Table>
                  <TableCaption>Executed Trades</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        <div className='w-96 min-h-screen p-6 space-y-6'>
          <Card className="dark rounded-[2px] overflow-hidden">
            <CardHeader className="color-[#FAFAFA]">
              Campaign
            </CardHeader>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Start Date - End Date</div>
              <div className="text-normal number-font">Sept 20 - Sept 27</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Pool</div>
              <div className="text-normal number-font">$10,000</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize structure</div>
              <div className="text-normal number-font">128</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Rules</div>
              <div className="text-sm number-font">Lorem ipsum dolor sit amet, consectetur..</div>
            </div>
          </Card>
          <Card className="dark rounded-[2px] overflow-hidden">
            <CardHeader className="color-[#FAFAFA]">
              My Summary
            </CardHeader>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Eligility for Prize Pool</div>
              <div className="text-normal number-font">$10,000</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Total Executed Trade Vol</div>
              <div className="text-normal number-font">$850</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Outstanding Orders</div>
              <div className="text-normal number-font">$250</div>
            </div>
          </Card>
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
        </div>
      </div>
    </div>
  )
}
