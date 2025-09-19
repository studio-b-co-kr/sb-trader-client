import {
  Card,
  CardHeader,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { CircleCheck } from "lucide-react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { UserData } from "@/lib/api"

interface TradesCardProps {
  myOpenOrders?: Order[];
  myExecutedOrders?: Order[];
}

export default function TradesCard({ myOpenOrders, myExecutedOrders }: TradesCardProps) {
  // Helper functions
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };
  const formatPrice = (price: number) => price.toFixed(4);
  const formatFee = (price: number) => price.toFixed(2);
  const formatQuantity = (quantity: number) => quantity.toFixed(8);

  // Calculate totals for open trades
  const openTotal = myOpenOrders.reduce((sum, order) => sum + (order.orderValue || 0), 0);
  const openSells = myOpenOrders.filter(order => order.side === 'sell').reduce((sum, order) => sum + (order.orderValue || 0), 0);
  const openBuys = myOpenOrders.filter(order => order.side === 'buy').reduce((sum, order) => sum + (order.orderValue || 0), 0);

  // Calculate totals for executed trades
  const executedTotal = myExecutedOrders.reduce((sum, order) => sum + (order.filledValue || 0), 0);
  const executedSells = myExecutedOrders.filter(order => order.side === 'sell').reduce((sum, order) => sum + (order.filledValue || 0), 0);
  const executedBuys = myExecutedOrders.filter(order => order.side === 'buy').reduce((sum, order) => sum + (order.filledValue || 0), 0);

  return (
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
              <div className="text-normal number-font">{formatCurrency(openTotal)}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Open Sells</div>
              <div className="text-normal number-font text-[#719ED2]">{formatCurrency(openSells)}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Open Buys</div>
              <div className="text-normal number-font text-[#DE999A]">{formatCurrency(openBuys)}</div>
            </div>
          </div>
          <Table>
            <TableCaption>Open Trades ({myOpenOrders.length} orders)</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Input Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!myOpenOrders || myOpenOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-[#FAFAFA]/50">
                    No outstanding orders
                  </TableCell>
                </TableRow>
              ) : (
                myOpenOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="number-font">{formatDateTime(order.createdAt)}</TableCell>
                    <TableCell>
                      <span className={` ${order.status === 'pending' ? 'uppercase number-font text-gray-400' : ''}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`uppercase number-font ${order.side === 'buy' ? 'text-[#DE999A]' : 'text-[#719ED2]'}`}>
                        {order.side}
                      </span>
                    </TableCell>
                    <TableCell className="text-right number-font">{formatPrice(order.price)}</TableCell>
                    <TableCell className="text-right number-font">{formatQuantity(order.quantity)}</TableCell>
                    <TableCell className="text-right number-font">{formatCurrency(order.orderValue)}</TableCell>
                    <TableCell className="text-right number-font">{formatCurrency(order.filledValue)}</TableCell>
                    <TableCell className="text-right number-font">{formatFee(order.feeAmount)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="executed">
          <div className="flex flex-row justify-start gap-x-16 pt-6 pb-12">
            <div className="flex flex-col gap-1">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Executed Total</div>
              <div className="text-normal number-font">{formatCurrency(executedTotal)}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Executed Sells</div>
              <div className="text-normal number-font text-[#719ED2]">{formatCurrency(executedSells)}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Executed Buys</div>
              <div className="text-normal number-font text-[#DE999A]">{formatCurrency(executedBuys)}</div>
            </div>
          </div>
          <Table>
            <TableCaption>Executed Trades ({myExecutedOrders?.length} orders)</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Input Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!myExecutedOrders || myExecutedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-[#FAFAFA]/50">
                    No executed orders
                  </TableCell>
                </TableRow>
              ) : (
                myExecutedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="number-font">{formatDateTime(order.createdAt)}</TableCell>
                    <TableCell>
                      <span className={`capitalize ${order.status === 'completed' ? 'text-[#BFFFC1]' : ''}`}>
                        <CircleCheck strokeWidth="2" className="w-5 h-5" color="#BFFFC1" />
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`capitalize ${order.side === 'buy' ? 'text-[#DE999A]' : 'text-[#719ED2]'}`}>
                        {order.side}
                      </span>
                    </TableCell>
                    <TableCell className="text-right number-font">{formatPrice(order.price)}</TableCell>
                    <TableCell className="text-right number-font">{formatQuantity(order.quantity)}</TableCell>
                    <TableCell className="text-right number-font">{formatCurrency(order.orderValue)}</TableCell>
                    <TableCell className="text-right number-font">{formatCurrency(order.filledValue)}</TableCell>
                    <TableCell className="text-right number-font">{formatFee(order.feeAmount)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </Card>
  )
}