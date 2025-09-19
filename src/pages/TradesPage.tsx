import { useSuiClientQuery } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { useNetworkVariable } from '../configs/networkConfig'

export default function TradesPage() {
  const transactionBookId = useNetworkVariable('transactionBookId')
  const [transactions, setTransactions] = useState<
    { sender: string; side: string; price: string; quantity: string; symbol: string; exchange: string; filled_at: string; timestamp: string }[]
  >([])

  const { data, isPending, error } = useSuiClientQuery(
    'getObject',
    {
      id: transactionBookId,
      options: { showContent: true },
    },
    {
      enabled: !!transactionBookId,
    },
  )

  useEffect(() => {
    const content = data?.data?.content

    if (content?.dataType === 'moveObject' && 'fields' in content) {
      const fields = content.fields as {
        transactions: {
          fields: {
            sender: string
            price: string
            side: string
            quantity: string
            symbol: string
            exchange: string
            filled_at: string
            timestamp: string
          }
        }[]
      }

      const txList = fields.transactions.map((t) => t.fields)
      setTransactions(txList)
    }
  }, [data])

  return (
    <div className="container mx-auto my-4 px-4">
      {isPending && (
        <p className="text-gray-600">Loading...</p>
      )}

      {error && (
        <p className="text-red-600">Error: {(error as Error).message}</p>
      )}

      {!isPending && transactions && transactions.length === 0 && (
        <p className="text-gray-600">No transactions yet.</p>
      )}

      {!isPending && transactions && transactions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black-100 border border-pink-400 rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-pink-400 text-left font-semibold">Side</th>
                <th className="px-4 py-2 border-b border-pink-400 text-left font-semibold">Price</th>
                <th className="px-4 py-2 border-b border-pink-400 text-left font-semibold">Quantity</th>
                <th className="px-4 py-2 border-b border-pink-400 text-left font-semibold">Symbol</th>
                <th className="px-4 py-2 border-b border-pink-400 text-left font-semibold">Exchange</th>
                <th className="px-4 py-2 border-b border-pink-400 text-left font-semibold">Filled at</th>
                <th className="px-4 py-2 border-b border-pink-400 text-left font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="even:bg-gray-800">
                  <td className="px-4 py-2 border-b border-pink-400">{tx.side}</td>
                  <td className="px-4 py-2 border-b border-pink-400">{tx.price}</td>
                  <td className="px-4 py-2 border-b border-pink-400">{tx.quantity}</td>
                  <td className="px-4 py-2 border-b border-pink-400">{tx.symbol}</td>
                  <td className="px-4 py-2 border-b border-pink-400">{tx.exchange}</td>
                  <td className="px-4 py-2 border-b border-pink-400">{tx.filled_at}</td>
                  <td className="px-4 py-2 border-b border-pink-400">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}