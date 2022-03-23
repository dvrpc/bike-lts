// objects with info for each legend type
const legendConfigs = {
  lts: {
    title: "Levels of Traffic Stress",
    icons: [
      "var(--theme-green)",
      "var(--theme-green-light)",
      "var(--theme-yellow)",
      "var(--theme-red)",
    ],
    iconType: "line",
    text: ["LTS 1", "LTS 2", "LTS 3", "LTS 4"],
  },
  priority: {
    title: "Regional Connectivity Priorities",
    icons: ["#993404", "#d95f0e", "#fe9929", "#fed98e", "#ffffd4"],
    iconType: "line",
    text: ["top 10%", "top 20%", "top 30%", "top 40%", "top 50%"],
  },
  school: {
    title: "Priority Connections to Schools",
    icons: ["#984ea3"],
    iconType: "line",
    text: [
      "LTS 3 road segments that would enable low-stress connections to schools within 2 miles",
    ],
  },
  trails: {
    title: "Priority Connections to Trails",
    icons: ["#498434"],
    iconType: "line",
    text: [
      "LTS 3 road segments that would enable low-stress connections to trails within 2.5 miles",
    ],
  },
  transit: {
    title: "Priority Connections to Transit",
    icons: ["#F49FBC"],
    iconType: "line",
    text: [
      "LTS 3 road segments that would enable low-stress connections to transit stops within 3 miles",
    ],
  },
  facilities: {
    title: "Bicycle Facilities",
    icons: ["#123899", "#ffffb3", "#29c2eb", "#56bd49", "#bebada", "#ff872c"],
    iconType: "line",
    text: [
      "Bike Lane",
      "Bike Route",
      "Buffered Bike Lane",
      "Off-road Trail/Path",
      "Protected Bike Lane",
      "Sharrow &nbsp;",
    ],
  },
  ["trail-access"]: {
    title: "Trail Access Locations",
    source: "DVRPC",
    icons: ["#377eb8"],
    iconType: "circle",
    text: ["Trailheads"],
  },
  lowstress: {
    title: "Low-stress Areas",
    icons: ["--theme-black"],
    iconType: "none",
    text: [
      "Each distinct color represents a unique low-stress area, disconnected from others.",
    ],
  },
  // handle transit special case - consolidate into here
  ["passenger-rail"]: {
    title: "Transit Stops",
    source: "SEPTA, NJ Transit, DRPA",
    icons: ["#004d6e", "#f18541", "#ed164b"],
    iconType: "circle",
    text: ["Bus", "Passenger Rail", "Trolley"],
  },
  // handle transit special case
  trolley: {
    title: "",
    icons: [],
    iconType: "",
    text: [""],
  },
  // handle transit special case
  bus: {
    title: "",
    icons: [],
    iconType: "",
    text: [""],
  },
  "schools-combined": {
    title: "Schools",
    source: "DVRPC, 2015",
    icons: ["#fc8d62", "#66c2a5"],
    iconType: "circle",
    text: ["public", "private"],
  },
};

export default legendConfigs;
