import { Data } from "./data";

import { data } from "./pairs";

const supportedResolutions = [
  "1",
  "3",
  "5",
  "15",
  "30",
  "60",
  "120",
  "240",
  "D",
  "W",
];

const config = {
  supported_resolutions: supportedResolutions,
};

export default {
  onReady: (cb) => {
    console.log("cehckvvv", cb);
    // console.log('=====onReady running')
    setTimeout(() => cb(config), 0);
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    for (var i = 0; i < data.length; ++i) {
      if (!data[i].params) {
        data[i].params = [];
      }
    }
    if (typeof data.s == "undefined" || data.s != "error") {
      onResultReadyCallback(data);
    } else {
      onResultReadyCallback([]);
    }
    // console.log('====Search Symbols running')
  },
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    // expects a symbolInfo object in response
    // console.log('======resolveSymbol running')
    // console.log('resolveSymbol:',{symbolName})
    var split_data = symbolName.split(/[:/]/);
    // console.log({split_data})
    var symbol_stub = {
      name: symbolName,
      description: "",
      type: "crypto",
      session: "24x7",
      timezone: "Etc/UTC",
      ticker: symbolName,
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      intraday_multipliers: ["1", "60"],
      supported_resolution: supportedResolutions,
      volume_precision: 8,
      data_status: "streaming",
    };

    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
      // console.log('Resolving that symbol....', symbol_stub)
    }, 0);

    // onResolveErrorCallback('Not feeling it today')
  },
  getBars: function (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    // console.log('=====getBars running')
    // console.log('function args',arguments)
    // console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
    const bars = Data.map((el) => {
      return {
        time: el.time * 1000, //TradingChart requires bar time in ms
        low: el.low,
        high: el.high,
        open: el.open,
        close: el.close,
      };
    });
    const getBarsPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(bars);
      }, 1000); // 1 second delay
    });

    getBarsPromise
      .then((bars) => {
        if (bars.length) {
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback(bars, { noData: true });
        }
      })
      .catch((err) => {
        onErrorCallback(err);
      });
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    // console.log('=====subscribeBars runnning')
    // stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
  },
  unsubscribeBars: (subscriberUID) => {
    // console.log('=====unsubscribeBars running')
    // stream.unsubscribeBars(subscriberUID)
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    //optional
    // console.log('=====calculateHistoryDepth running')
    // while optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
    return resolution < 60
      ? { resolutionBack: "D", intervalBack: "1" }
      : undefined;
  },
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
    // console.log('=====getMarks running')
  },
  getTimeScaleMarks: (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) => {
    //optional
    // console.log('=====getTimeScaleMarks running')
  },
  getServerTime: (cb) => {
    // console.log('=====getServerTime running')
  },
};
