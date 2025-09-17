import {
  Card,
  CardHeader,
} from "@/components/ui/card"

// Image assets from Figma
const imgLine12 = "http://localhost:3845/assets/66aaa6457c36fdbeeebea435ae78d389212ac6ec.svg";
const imgLine13 = "http://localhost:3845/assets/717c9dd3db4e95121b97fcdddd790324f9fe5dbe.svg";
const imgEllipse1 = "http://localhost:3845/assets/ae82a44d683d69346ab4d23e923f9dea8e5187ba.svg";
const imgEllipse2 = "http://localhost:3845/assets/f51fdd54b33206262eb1610ebc9525be67312a1e.svg";
const imgGroup = "http://localhost:3845/assets/e8f26c068d379f22408a7dc4b0ae43be9ccb5916.svg";

interface FoundationNewCampaignProps {
  campaignId?: string;
}

const campaignName = "Blue Sept Campaign";

export default function FoundationNewCampaign({ campaignId }: FoundationNewCampaignProps) {
  return (
    <div className="container mx-auto max-w-9xl">
      <div className="flex flex-row justify-stretch gap-0 min-h-screen">
        <div className="flex-grow min-h-screen border-r border-[#B6A2B7]/20 pr-6 pt-6">
          <div className="fancy-font text-[#FAFAFA] text-[48px]">Campaign Agreement</div>
          <div className="flex flex-row items-end gap-x-20 py-12 mb-12 border-b border-[#DDDDDD]/20">
            <div className="text-[24px] text-[#DDDDDD]/80 font-normal">{campaignName}</div>
            <div className="flex flex-col items-start justify-start gap-[2px]">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Pool</div>
              <div className="text-lg number-font">
                10,000,000 
                <span className="support-character pl-[2px]">KRW</span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[2px]">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Token</div>
              <div className="text-lg number-font">BLUE</div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[2px]">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Exchange</div>
              <div className="text-lg number-font">Bithumb</div>
            </div>
          </div>
          <div className="">
       
            <div className="flex flex-col">
              <div className="leading-[40px]">Campaign Status</div>
              <div className="">
                <div className="text-sm">
                  <div className="flex flex-row justify-start items-start min-h-[40px]">
                    <div className="w-20 text-center">Icon</div>
                    <div className="w-64 text-[#AAAAAA]">Foundation E-Signature</div>
                    <div className="number-font font-light text-[#888888]">Sept 20, 2025 12:00PM KST (expected)</div>
                  </div>
                  <div className="flex flex-row justify-start items-start min-h-[40px]">
                    <div className="w-20 text-center">Icon</div>
                    <div className="w-64 text-[#AAAAAA]">StudioB E-Signature</div>
                    <div className="number-font font-light text-[#888888]">Sept 20, 2025 12:00PM KST (expected)</div>
                  </div>
                  <div className="flex flex-row justify-start items-start min-h-[40px]">
                    <div className="w-20 text-center">Icon</div>
                    <div className="w-64 text-[#AAAAAA]">Prize Pool Sent</div>
                    <div className="number-font font-light text-[#888888]">Sept 20, 2025 12:00PM KST (expected)</div>
                  </div>
                  <div className="flex flex-row justify-start items-start min-h-[40px]">
                    <div className="w-20 text-center">Icon</div>
                    <div className="w-64 text-[#AAAAAA]">Campaign Trading Start</div>
                    <div className="number-font font-light text-[#888888]">Sept 20, 2025 12:00PM KST (expected)</div>
                  </div>
                  <div className="flex flex-row justify-start items-start min-h-[40px]">
                    <div className="w-20 text-center">Icon</div>
                    <div className="w-64 text-[#AAAAAA]">Campaign Trading Ends</div>
                    <div className="number-font font-light text-[#888888]">Sept 20, 2025 12:00PM KST (expected)</div>
                  </div>
                  <div className="flex flex-row justify-start items-start min-h-[40px]">
                    <div className="w-20 text-center">Icon</div>
                    <div className="w-64 text-[#AAAAAA]">Prize Pool Distributed</div>
                    <div className="number-font font-light text-[#888888]">Sept 20, 2025 12:00PM KST (expected)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader className="font-bold text-lg uppercase text-[#DDDDDD]">Legal Agreement</CardHeader>
            <div className="whitespace-pre-line text-[#BBBBBB] text-sm px-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque condimentum enim ac erat scelerisque aliquet. Nullam laoreet risus non risus imperdiet scelerisque. Vivamus commodo ante dui, eget imperdiet ex finibus nec. Vestibulum varius nisl at varius ultrices. Donec fringilla mauris sem, mattis convallis purus euismod eget. Mauris eros purus, rhoncus ut nulla ut, bibendum consequat nulla. Nullam vestibulum libero sed molestie lobortis.<br /><br />
              Praesent laoreet odio lacus, et consectetur eros lacinia eu. Maecenas metus nisi, gravida et consectetur at, fermentum vitae risus. In at enim diam. Donec hendrerit, metus vitae feugiat porta, purus velit vestibulum ligula, non hendrerit odio diam ut elit. Cras tristique eros eget dictum pharetra. Donec feugiat ut sapien vitae dignissim. Curabitur malesuada dapibus ante, sit amet tincidunt risus tincidunt vitae. Vivamus hendrerit ipsum ullamcorper ipsum lacinia tincidunt. Nam quis libero sit amet odio consequat dignissim. Nullam sem quam, hendrerit sed facilisis venenatis, pharetra sit amet tortor. Ut tellus quam, consectetur id aliquam id, tincidunt in quam. Vivamus et lacus at nibh faucibus molestie. Donec aliquet nibh et sapien posuere, vitae facilisis nulla vulputate. Cras volutpat volutpat tortor in dictum.<br /><br />
              Suspendisse quis nibh eu massa ullamcorper blandit eget nec est. Proin id urna nec magna euismod molestie. Nulla at sapien a justo vestibulum finibus eu vitae elit. Vestibulum eget arcu vitae turpis dapibus pharetra id sit amet dolor. Phasellus tincidunt ante quis bibendum condimentum. Nulla euismod elementum velit, in mollis ligula euismod in. Aliquam mi erat, euismod non feugiat commodo, scelerisque a velit. Nunc ligula velit, eleifend et consequat quis, scelerisque id ligula. Etiam consectetur, quam vel pretium pretium, purus eros dapibus sapien, quis volutpat metus mi ut enim. Praesent rhoncus, tellus nec suscipit accumsan, turpis ante vulputate nisi, at placerat metus tortor nec odio. Nulla facilisi. Aliquam nec enim interdum, posuere risus ac, mattis purus. Praesent ac interdum quam.<br /><br />
              Praesent et est eget dolor semper placerat non quis dolor. Curabitur et libero non orci posuere cursus in pretium augue. In ac orci a diam venenatis pellentesque dictum non nisi. Phasellus lorem sem, porttitor sit amet eleifend ac, scelerisque eget arcu. Donec enim lorem, tincidunt sit amet aliquet vitae, accumsan ut metus. Curabitur odio enim, congue vitae hendrerit a, pellentesque ut leo. Cras eleifend sagittis dolor, quis vehicula nulla volutpat id. Duis ultricies nisi quis sapien scelerisque facilibus.<br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque condimentum enim ac erat scelerisque aliquet. Nullam laoreet risus non risus imperdiet scelerisque. Vivamus commodo ante dui, eget imperdiet ex finibus nec. Vestibulum varius nisl at varius ultrices. Donec fringilla mauris sem, mattis convallis purus euismod eget. Mauris eros purus, rhoncus ut nulla ut, bibendum consequat nulla. Nullam vestibulum libero sed molestie lobortis.<br /><br />
              Praesent laoreet odio lacus, et consectetur eros lacinia eu. Maecenas metus nisi, gravida et consectetur at, fermentum vitae risus. In at enim diam. Donec hendrerit, metus vitae feugiat porta, purus velit vestibulum ligula, non hendrerit odio diam ut elit. Cras tristique eros eget dictum pharetra. Donec feugiat ut sapien vitae dignissim. Curabitur malesuada dapibus ante, sit amet tincidunt risus tincidunt vitae. Vivamus hendrerit ipsum ullamcorper ipsum lacinia tincidunt. Nam quis libero sit amet odio consequat dignissim. Nullam sem quam, hendrerit sed facilisis venenatis, pharetra sit amet tortor. Ut tellus quam, consectetur id aliquam id, tincidunt in quam. Vivamus et lacus at nibh faucibus molestie. Donec aliquet nibh et sapien posuere, vitae facilibus nulla vulputate. Cras volutpat volutpat tortor in dictum.<br /><br />
              Suspendisse quis nibh eu massa ullamcorper blandit eget nec est. Proin id urna nec magna euismod molestie. Nulla at sapien a justo vestibulum finibus eu vitae elit. Vestibulum eget arcu vitae turpis dapibus pharetra id sit amet dolor. Phasellus tincidunt ante quis bibendum condimentum. Nulla euismod elementum velit, in mollis ligula euismod in. Aliquam mi erat, euismod non feugiat commodo, scelerisque a velit. Nunc ligula velit, eleifend et consequat quis, scelerisque id ligula. Etiam consectetur, quam vel pretium pretium, purus eros dapibus sapien, quis volutpat metus mi ut enim. Praesent rhoncus, tellus nec suscipit accumsan, turpis ante vulputate nisi, at placerat metus tortor nec odio. Nulla facilisi. Aliquam nec enim interdum, posuere risus ac, mattis purus. Praesent ac interdum quam.<br /><br />
              Praesent et est eget dolor semper placerat non quis dolor. Curabitur et libero non orci posuere cursus in pretium augue. In ac orci a diam venenatis pellentesque dictum non nisi. Phasellus lorem sem, porttitor sit amet eleifend ac, scelerisque eget arcu. Donec enim lorem, tincidunt sit amet aliquet vitae, accumsan ut metus. Curabitur odio enim, congue vitae hendrerit a, pellentesque ut leo. Cras eleifend sagittis dolor, quis vehicula nulla volutpat id. Duis ultricies nisi quis sapien scelerisque facilibus.<br /><br />
              Sed ac consequat arcu. Nulla sagittis nibh sit amet rutrum tincidunt. Donec non lectus bibendum dui fermentum pretium. Nullam rhoncus magna arcu. Proin nulla neque, rutrum a ornare eu, finibus vel urna. Sed vitae semper augue, et pretium lorem. Aliquam eu odio justo. Donec nulla purus, finibus sit amet odio vitae, vestibulum commodo erat. Sed finibus iaculis magna eget pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel enim nec felis feugiat ullamcorper a non nisl. Nam sit amet metus non sem semper laoreet sed eu ligula. Mauris quis ligula sed quam lacinia tempus at eu turpis. Nam tempus tellus vitae est egestas, sed sollicitudin dolor luctus.<br />
            </div>
          </Card>
        </div>
        <div className='w-96 min-h-screen p-6 space-y-6 flex-shrink-0'>
          <Card className="dark rounded-[2px] overflow-hidden">
            <CardHeader className="color-[#FAFAFA]">
              Campaign Summary
            </CardHeader>
            <div className="w-full">
              <div className="flex flex-col gap-1 px-6">
                <div className="text-normal number-font flex flex-row items-center gap-3">
                  <div className="flex flex-col items-start justify-start gap-0">
                  <div className="text-sm uppercase text-[#FAFAFA]/30">Start Date</div>
                    <div className="text-sm number-font">Sept 20, 2025</div>
                    <div className="text-xs number-font opacity-30">12:00PM KST</div>
                  </div>
                  <div>-</div>
                  <div className="flex flex-col items-start justify-start gap-0">
                  <div className="text-sm uppercase text-[#FAFAFA]/30">Start Date</div>
                    <div className="text-sm number-font">Sept 28, 2025</div>
                    <div className="text-xs number-font opacity-30">12:00PM KST</div>
                  </div>
                  
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

