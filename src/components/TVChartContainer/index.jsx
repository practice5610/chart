import React, { useEffect } from "react";
import "./index.css";
import Datafeed from "./api/";

const INTERVAL = {
  MINUTE: "1",
  MINUTES_5: "5",
  MINUTES_15: "15",
  MINUTES_30: "30",
  HOUR: "60",
  HOURS_3: "180",
  HOURS_6: "360",
  HOURS_12: "720",
  DAY: "D",
  WEEK: "W",
};

const TIME_FRAMES = [
  { text: "3y", resolution: INTERVAL.WEEK, description: "3 Years" },
  { text: "1y", resolution: INTERVAL.DAY, description: "1 Year" },
  { text: "3m", resolution: INTERVAL.HOURS_12, description: "3 Months" },
  { text: "1m", resolution: INTERVAL.HOURS_6, description: "1 Month" },
  { text: "7d", resolution: INTERVAL.HOUR, description: "7 Days" },
  { text: "3d", resolution: INTERVAL.MINUTES_30, description: "3 Days" },
  { text: "1d", resolution: INTERVAL.MINUTES_15, description: "1 Day" },
  { text: "6h", resolution: INTERVAL.MINUTES_5, description: "6 Hours" },
  { text: "1h", resolution: INTERVAL.MINUTE, description: "1 Hour" },
];

const TVChartContainer = ({
  symbol = "BTC/USD",
  interval = "15",
  containerId = "tv-chart",
  libraryPath = "../charting_library/",
  chartsStorageUrl = "https://saveload.test.com",
  chartsStorageApiVersion = "1.1",
  clientId = "test.com",
  userId = "public_user_id",
  fullscreen = false,
  autosize = true,
  studiesOverrides = {},
  theme = "Dark",
}) => {
  useEffect(() => {
    const widgetOptions = {
      debug: false,
      symbol,
      datafeed: Datafeed,
      interval,
      container_id: containerId,
      library_path: libraryPath,
      locale: "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates", "hide_left_toolbar_by_default"],
      disabledDrawings: true,
      charts_storage_url: chartsStorageUrl,
      charts_storage_api_version: chartsStorageApiVersion,
      client_id: clientId,
      user_id: userId,
      fullscreen,
      time_frames: TIME_FRAMES,
      autosize,
      theme,
      studies_overrides: studiesOverrides,
      overrides: {
        "mainSeriesProperties.showCountdown": false,
      },
    };
    console.log("cehckkk", window.TradingChart);
    window.TradingChart.onready(() => {
      console.log("cehckkk22", window.TradingChart);
      const widget = (window.tvWidget = new window.TradingChart.widget(
        widgetOptions
      ));
      widget.onChartReady(() => {
        widget
          .createButton()
          .attr("title", "Dark Mode")
          .addClass("apply-common-tooltip")
          .on("click", () => widget.changeTheme("Dark"))[0].innerHTML = "Dark";
        widget
          .createButton()
          .attr("title", "Light Mode")
          .addClass("apply-common-tooltip")
          .on("click", () => widget.changeTheme("Light"))[0].innerHTML =
          "Light";
      });
    });
  }, [
    symbol,
    interval,
    containerId,
    libraryPath,
    chartsStorageUrl,
    chartsStorageApiVersion,
    clientId,
    userId,
    fullscreen,
    autosize,
    studiesOverrides,
    theme,
  ]);

  return <div id={containerId} className="TVChartContainer" />;
};

export default TVChartContainer;
