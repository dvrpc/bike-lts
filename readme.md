# [DVRPC Bike Level of Traffic Stress (LTS) and Connectivity Analysis](https://www.dvrpc.org/webmaps/bike-lts)

This regional screening tool was developed to help identify and rank roads where bicycle facility improvements would have the greatest local and regional connectivity benefit to the low-stress bicycle network. LTS is a road classification scheme based on the estimated comfort of bicyclists in the traffic stream. DVRPC’s LTS assignment is based on the <strong>number of lanes</strong>, effective <strong>vehicle speed</strong>, and the presence and type of <strong>bicycle facility</strong> on the road segment.

This repository contains two parts:

## Scroll Story
The default landing page for the LTS project is a scrolling story that explains what the Bike LTS analysis is for, why it exists and how it can be useful. This is meant to provide background information and serve as a launching point for the interactive analysis map. 

## Analysis Map
An update to the old ESRI AGO LTS map that will improve performance, add more features and streamline the user experience. We will be moving away from the existing AGO platform into a custom solution built with [mapboxgl js](https://docs.mapbox.com/mapbox.js/api/v3.3.1/) and custom vector tiles.


## Build Process
- <strong>Scroll Story</strong>
    - Webpack config currently isn't working for the scroll story, copy source code to staging
- <strong>Analysis Map</strong>
    - from root, `cd` to /analysis
    - `npm install` (first time only)
    - `npm run build`
    - delete <script></script> that has `index.js` at <head></head> of `index.html`
    - IF cache busting is needed, rename CSS and other files in both the `index.html` and CSS (or other) folder to force the newest file to deliver
    - copy files within build folder to staging folder at /webmaps/bike-lts/analysis