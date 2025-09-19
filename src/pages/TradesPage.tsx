import dayjs from 'dayjs'
import { useSuiClientQuery } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { useNetworkVariable } from '../configs/networkConfig'

export default function TradesPage() {
  const transactionBookId = useNetworkVariable('transactionBookId')
  const [transactions, setTransactions] = useState<
    { id: unknown; sender: string; side: string; price: string; quantity: string; symbol: string; exchange: string; filled_at: string; timestamp: string }[]
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
            id: unknown
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

  function formatDateTime(ts?: string) {
    if (!ts) return '';
    const n = Number(ts);
    if (isNaN(n)) return ts;
    const ms = n > 1e12 ? n : n * 1000;
    return dayjs(ms).format('YYYY-MM-DD HH:mm');
  }

  function shortenAddress(id: string, length = 4) {
    return `${id.slice(0, 2 + length)}...${id.slice(-length)}`;
  }
  // TODO: add campaign id and trader id columns, add sorting, pagination
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
          <div className="rounded border border-pink-600 shadow">
            <table className="min-w-full bg-black-100 rounded ">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-pink-600 text-left font-semibold">ID</th>
                  <th className="px-4 py-2 border-b border-pink-600 text-left font-semibold">Side</th>
                  <th className="px-4 py-2 border-b border-pink-600 text-right font-semibold">Price</th>
                  <th className="px-4 py-2 border-b border-pink-600 text-right font-semibold">Quantity</th>
                  <th className="px-4 py-2 border-b border-pink-600 text-left font-semibold">Symbol</th>
                  <th className="px-4 py-2 border-b border-pink-600 text-left font-semibold">Exchange</th>
                  <th className="px-4 py-2 border-b border-pink-600 text-left font-semibold">Filled at</th>
                  <th className="px-4 py-2 border-b border-pink-600 text-left font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => {
                  const isLastRow = i === transactions.length - 1;
                  const tdClass = `px-4 py-2 text-sm border-b border-pink-600${isLastRow ? ' border-b-0' : ''}`;
                  return (
                    <tr key={i} className="even:bg-gray-800">
                      <td className={`${tdClass} font-mono text-right`}>
                        <a href="https://testnet.suivision.xyz/object/0xc12298a1291d0d70df3c22aa70171bb1ca1531270d404a2b78263096d59a1e95"
                          className="underline underline-offset-2">
                          <div className='flex items-center justify-end gap-2'>
                          <span>{shortenAddress((tx as { id: { id: string } }).id.id)}</span>
                          {/* <button
                            onClick={() => {
                              navigator.clipboard.writeText((tx as { id: { id: string } }).id.id);
                            }}
                            className='text-xs text-blue-500 hover:underline'
                          >
                            copy
                          </button> */}

                        </div></a>
                      </td>
                      <td className={tdClass}>{tx.side}</td>
                      <td className={`${tdClass} font-mono text-right`}>{tx.price}</td>
                      <td className={`${tdClass} font-mono text-right`}>{tx.quantity}</td>
                      <td className={tdClass}>{tx.symbol}</td>
                      <td className={tdClass}>{tx.exchange}</td>
                      <td className={tdClass}>{formatDateTime(tx.filled_at)}</td>
                      <td className={tdClass}>{formatDateTime(tx.timestamp)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}