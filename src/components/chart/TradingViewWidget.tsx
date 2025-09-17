// TradingViewWidget.jsx
import { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  token: string;
}

function TradingViewWidget({ token }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      // Clear the container first to prevent duplicate widgets
      if (container.current) {
        container.current.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
      }

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "lineWidth": 2,
          "lineType": 0,
          "chartType": "area",
          "fontColor": "rgb(106, 109, 120)",
          "gridLineColor": "rgba(248, 187, 208, 0.06)",
          "volumeUpColor": "rgba(34, 171, 148, 0.5)",
          "volumeDownColor": "rgba(247, 82, 95, 0.5)",
          "backgroundColor": "#0F0F0F",
          "widgetFontColor": "rgba(219, 219, 219, 1)",
          "upColor": "#22ab94",
          "downColor": "#f7525f",
          "borderUpColor": "#22ab94",
          "borderDownColor": "#f7525f",
          "wickUpColor": "#22ab94",
          "wickDownColor": "#f7525f",
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "kr",
          "chartOnly": true,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "symbols": [
            [
              "BITHUMB:${token}KRW|1D|KRW"
            ]
          ],
          "dateRanges": [
            "1d|1",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "fontSize": "10",
          "headerFontSize": "medium",
          "autosize": true,
          "dateFormat": "yyyy-MM-dd",
          "lineColor": "#D170BF",
          "width": "100%",
          "height": "100%",
          "noTimeScale": false,
          "hideDateRanges": false,
          "hideMarketStatus": true,
          "hideSymbolLogo": false
        }`;

      if (container.current) {
        container.current.appendChild(script);
      }

      // Cleanup function to remove the script when component unmounts
      return () => {
        if (container.current) {
          container.current.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
        }
      };
    },
    [token]
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://kr.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(TradingViewWidget);