import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CampaignBlankPageProps {
  campaignId: string
}

export default function CampaignBlankPage({ campaignId }: CampaignBlankPageProps) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <div>
        <h1 className="text-5xl font-bold">Campaign {campaignId}</h1>
        <p className="mt-2 text-lg text-gray-500">
          Start building the campaign experience here.
        </p>
      </div>

      <Card className="w-full max-w-xl border-dashed">
        <CardHeader>
          <CardTitle>Blank Canvas</CardTitle>
          <CardDescription>
            Add components, forms, or metrics tailored to this campaign.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

