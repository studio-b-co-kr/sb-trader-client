import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">SUI Campaign Dashboard</h1>
        <p className="text-gray-400">Manage and monitor your SUI campaigns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Total Campaigns</CardTitle>
            <CardDescription className="text-gray-400">Active and completed campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">12</div>
            <p className="text-sm text-gray-400">+2 this week</p>
          </CardContent>
          <CardFooter>
            <CardAction className="text-blue-400 hover:text-blue-300">View All</CardAction>
          </CardFooter>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Total Participants</CardTitle>
            <CardDescription className="text-gray-400">Across all campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">5,678</div>
            <p className="text-sm text-gray-400">+234 this week</p>
          </CardContent>
          <CardFooter>
            <CardAction className="text-blue-400 hover:text-blue-300">View Details</CardAction>
          </CardFooter>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Rewards Distributed</CardTitle>
            <CardDescription className="text-gray-400">Total SUI distributed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">25,432 SUI</div>
            <p className="text-sm text-gray-400">+1,234 this week</p>
          </CardContent>
          <CardFooter>
            <CardAction className="text-blue-400 hover:text-blue-300">View History</CardAction>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Recent Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Campaign #001</CardTitle>
              <CardDescription className="text-gray-400">SUI Token Distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Active campaign with 1,234 participants</p>
            </CardContent>
            <CardFooter>
              <CardAction className="text-blue-400 hover:text-blue-300">View Campaign</CardAction>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Campaign #002</CardTitle>
              <CardDescription className="text-gray-400">NFT Airdrop Event</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Completed campaign with 2,345 participants</p>
            </CardContent>
            <CardFooter>
              <CardAction className="text-blue-400 hover:text-blue-300">View Campaign</CardAction>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
