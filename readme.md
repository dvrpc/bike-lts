# DVRPC Bike Level of Traffic Stress (LTS) and Connectivity Analysis

This regional screening tool was developed to help identify and rank roads where bicycle facility improvements would have the greatest local and regional connectivity benefit to the low-stress bicycle network. LTS is a road classification scheme based on the estimated comfort of bicyclists in the traffic stream. DVRPC’s LTS assignment is based on the <strong>number of lanes</strong>, effective <strong>vehicle speed</strong>, and the presence and type of <strong>bicycle facility</strong> on the road segment.

This repository contains two parts:

## Scroll Story
The default landing page for the LTS project will be a scrolling story that explains what the Bike LTS analysis is for, why it exists and how it can be useful. This is meant to provide background information and serve as a launching point for the interactive analysis map. 

## Analysis Map
An update to the [existing](https://www.dvrpc.org/webmaps/BikeStress/) LTS map that will improve performance, add more features and streamline the user experience. We will be moving away from the existing AGO platform into a custom solution built with [mapboxgl js](https://docs.mapbox.com/mapbox.js/api/v3.3.1/) and custom vector tiles.


## Review Notes
- change magenta on the connectivity magenta jawn to a color that works better w/brown (magenta makes brown look red)
- change last connectivity scene zoom to Camden County bounds
- try some kind of downward arrow on splash page to indicate scrolling