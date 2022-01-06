# [DVRPC Bike Level of Traffic Stress (LTS) and Connectivity Analysis](https://www.dvrpc.org/webmaps/bike-lts)

This regional screening tool was developed to help identify and rank roads where bicycle facility improvements would have the greatest local and regional connectivity benefit to the low-stress bicycle network. LTS is a road classification scheme based on the estimated comfort of bicyclists in the traffic stream. DVRPC’s LTS assignment is based on the <strong>number of lanes</strong>, effective <strong>vehicle speed</strong>, and the presence and type of <strong>bicycle facility</strong> on the road segment.

This repository contains two parts:

## Scroll Story
The default landing page for the LTS project is a scrolling story that explains what the Bike LTS analysis is for, why it exists and how it can be useful. This is meant to provide background information and serve as a launching point for the interactive analysis map. The story uses the [scrollmagic](https://scrollmagic.io/) library to handle scrolling interactions, [mapboxgl js](https://docs.mapbox.com/mapbox.js/api/v3.3.1/) for mapping and HTML, CSS and Javascript for everything else. 

## Analysis Map
An update to the old ESRI AGO LTS map that improves performance, adds more features and streamlines the user experience. We moved away from the AGO platform to a custom solution built with [mapboxgl js](https://docs.mapbox.com/mapbox.js/api/v3.3.1/) and custom vector tiles. The app is bootstrapped from the [sidebar-float-template-wide](https://github.com/dvrpc/ReusableComponents/tree/master/maps/sidebar-float-template-wide) folder in resuable components. 


## Build Process
- <strong>Scroll Story</strong>
    - Webpack config currently isn't working for the scroll story, copy source code to staging
- <strong>Analysis Map</strong>
    - from root, `cd` to /analysis
    - `npm install` (first time only)
    - `npm run build`
    - in `/build/`, delete `<script defer type="module" src="./js/index.js"></script>` from `index.html`
    - IF cache busting is needed, rename CSS and other files in both the `index.html` and CSS (or other) folder to force the newest file to deliver
    - copy files within build folder to staging folder at `/webmaps/bike-lts/analysis/`