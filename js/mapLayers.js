////
// Basemap layers
////
const countyOutline = {
    'id': 'county-outline',
    'type': 'line',
    'source': 'boundaries',
    'source-layer': 'county',
    'paint': {
        'line-width': 2.5,
        'line-color': '#242424'
    },
    'filter': ['==',
        'dvrpc', 'Yes'
    ]
}
const municipalityOutline = {
    'id': 'municipality-outline',
    'type': 'line',
    'source': 'boundaries',
    'source-layer': 'municipalities',
    'paint': {
        'line-width': 0.75,
        'line-color': '#a4a4a4'
    }
}


////
// Scene objects
////

// @UPDATE:
// Expand list of ignored layers in the hideLayers[] array to include scene sections above and below that 
// used to belong to map-2 and map-3
    // probably not an efficient solution, could be improved once implemented
    // hiding scenes:
        // the last in a set of scenes needs to hide all non-set scenes below it
        // the first neds to hide all non-set scenes above it
        // ^ that may depend on not having setInterval()
            // setInterval delay may prevent call that would apply hideLayers according to first/last

// lts scenes
const regionalScene = {
    zoom: 8.4,
    zoomMobile: 7.6,
    center: [-74.75, 40.071],
    centerMobile: [-75.12, 40.1],
    layers: [
        {
            id: 'lts-scene',
            type: 'line',
            source: 'lts',
            'source-layer': 'existing_conditions_lts',
            'paint': {
                'line-width': ['interpolate', 
                    ['linear'], ['zoom'],
                    8.35, 0.33,
                    10, 0.99,
                    11, 2.5,
                    17, 3,
                    20, 4
                ],
                'line-color': ['match',
                    ['get', 'lts_score'],
                    1, '#396829',
                    2, '#a4bc58',
                    3, '#fcd842',
                    4, '#a50a0a',
                    '#fff'
                ]
            }
        }
    ],
    hideLayers: []
}
const usingDataScene = {
    zoom: 12.5,
    zoomMobile: 12,
    center: [-75.685, 40.006], 
    centerMobile: [-75.701, 40.006],
    layers: [
        {
            id: 'lts-scene',
        }
    ],
    hideLayers: []
}
const lowStressOneScene = {
    zoom: 12.5,
    zoomMobile: 12,
    center: [-75.685, 40.006],
    centerMobile: [-75.701, 40.00],
    layers: [
        {
            id: 'lts-scene',
            filter: ['<', 'lts_score', 3]
        }
    ],
    hideLayers: []
}
const lowStressTwoScene = {
    zoom: 12.5,
    zoomMobile: 12,
    center: [-75.685, 40.006],
    centerMobile: [-75.701, 40.00],
    layers: [
        {
            id: 'lts-scene',
            filter: ['<', 'lts_score', 4]
        }
    ],
    hideLayers: []
}

// buffer
const bufferOneScene = {
    hideLayers: ['path', 'blocks', 'blocks-fill', 'priority-ipd', 'ipd-fill', 'priority-top', 'results-all', 'priority-ipd', 'priority-top-ipd', 'ipd-fill']
}

// connectivity analysis scenes
const connectivityOneScene = {
    zoom: 13.5,
    zoomMobile: 12.9,
    center: [-75.69, 40.006],
    centerMobile: [-75.707, 40.006],
    layers: [
        {
            id: 'path',
            type: 'line',
            source: 'path',
            paint: {
                'line-width': 4,
                'line-color': 'purple',
            }
        },
        {
            id: 'blocks',
            type: 'line',
            source: 'blocks',
            paint: {
                'line-width': 4,
                'line-color': 'orange',
            }
        },
        {
            id: 'blocks-fill',
            type: 'fill',
            source: 'blocks',
            paint: {
                'fill-color': 'orange',
                'fill-opacity': 0.5
            }
        }
    ],
    hideLayers: ['lts-scene', 'priority-top', 'results-all']
}
const connectivityTwoScene = {
    zoom: 11.5,
    zoomMobile: 10.9,
    center: [-75.685, 40.006],
    centerMobile: [-75.701, 40.006],
    layers: [
        {
            id: 'results-all',
            type: 'line',
            source: 'lts',
            'source-layer': 'results_all',
            paint: {
                'line-color': 'purple',
                'line-width': ['interpolate',
                    ['linear'],
                    ['get', 'total'],
                    1000, .25,
                    10000, 2.5,
                    100000, 4,
                    1000000, 6,
                    10000000, 8,
                ]
            },
            minzoom: 10
        },
        {
            id: 'priority-top',
            type: 'line',
            source: 'lts',
            'source-layer': 'priorities_all',
            paint: {
                'line-width': 6,
                'line-color': '#993404',
            },
            filter: ['==', 'main_priority', 10]
        }
    ],
    hideLayers: ['path', 'blocks', 'blocks-fill', 'priority-ipd', 'ipd-fill']
}
const connectivityEquityScene = {
    zoom: 8.4,
    zoomMobile: 7.6,
    center: [-74.75, 40.071],
    centerMobile: [-75.12, 40.1],
    layers: [
        {
            id: 'ipd-fill',
            type: 'fill',
            source: 'ipd',
            paint: {
                'fill-color': ['interpolate',
                    ['linear'],
                    ['get', 'ipd_score'],
                        9, '#ffffd9',
                        13, '#edf8b1',
                        15, '#c7e9b4',
                        17, '#7fcdbb',
                        19, '#41b6c4',
                        21, '#1d91c0',
                        24, '#225ea8',
                        27, '#253494',
                        30, '#081d58',
                    ],
                'fill-opacity': 0.4
            }
        },
        {
            id: 'priority-ipd',
            type: 'line',
            source: 'lts',
            'source-layer': 'priorities_all_ipd',
            paint: {
                'line-width': 4,
                'line-color': ['match',
                    ['get', 'main_priority_ipd'],
                    10, '#993404',
                    20, '#d95f0e',
                    30, '#fe9929',
                    40, '#fed98e',
                    50, '#ffffd4',
                    'rgba(0,0,0,0)'
                ]
            }
        }
    ],
    hideLayers: ['priority-top', 'results-all']
}
const connectivityPrioritiesScene = {
    zoom: 8.4,
    zoomMobile: 7.6,
    center: [-74.75, 40.071],
    centerMobile: [-75.12, 40.1],
    layers: [
        {
            id: 'priority-top',
            filter: ['==', 'main_priority', 10]
        }
    ],
    hideLayers: ['priority-ipd', 'priority-top-ipd', 'ipd-fill']
}
const connectivityPrioritiesEquityScene = {
    zoom: 10.1,
    zoomMobile: 9.4,
    center: [-74.86, 39.80],
    centerMobile: [-74.86, 39.90],
    layers: [
        {
            id: 'priority-top-ipd',
            type: 'line',
            source: 'lts',
            'source-layer': 'priorities_all_ipd',
            paint: {
                'line-width': 4,
                'line-color': '#253494',
                'line-opacity': 0.5
            },
            filter: ['==', 'main_priority_ipd', 10]
        },
        {
            id: 'priority-top',
            filter: ['==', 'main_priority', 10]
        }
    ],
    hideLayers: []
}

// buffer
const bufferTwoScene = {
    hideLayers: ['priority-top-ipd', 'priority-top', 'trails', 'transit', 'school']
}

// special destinations
const trailsScene = {
    zoom: 8.4,
    zoomMobile: 7.6,
    center: [-74.75, 40.071],
    centerMobile: [-75.12, 40.1],
    layers: [
        {
            id: 'trails',
            type: 'line',
            source: 'lts',
            'source-layer': 'priorities_trail',
            paint: {
                'line-width': ['interpolate',
                    ['linear'], ['zoom'],
                    8.35, 3,
                    11, 3.25,
                    17, 3.5,
                    20, 4
                ],
                'line-color': '#498434'
            }
        }
    ],
    hideLayers: ['transit', 'schools']
}
const transitScene = {
    zoom: 8.4,
    zoomMobile: 7.6,
    center: [-74.75, 40.071],
    centerMobile: [-75.12, 40.1],
    layers: [
        {
            id: 'transit',
            type: 'line',
            source: 'lts',
            'source-layer': 'priorities_alltransit',
            paint: {
                'line-width': ['interpolate',
                    ['linear'], ['zoom'],
                    8.35, 3,
                    11, 3.25,
                    17, 3.5,
                    20, 4
                ],
                'line-color': '#F49FBC'
            }
        }
    ],
    hideLayers: ['trails', 'schools']
}
const schoolsScene = {
    zoom: 8.4,
    zoomMobile: 7.6,
    center: [-74.75, 40.071],
    centerMobile: [-75.12, 40.1],
    layers: [
        {
            id: 'schools',
            type: 'line',
            source: 'lts',
            'source-layer': 'priorities_school',
            paint: {
                'line-width': ['interpolate',
                    ['linear'], ['zoom'],
                    8.35, 3,
                    11, 3.25,
                    17, 3.5,
                    20, 4
                ],
                'line-color':'#984ea3'
            }
        }
    ],
    hideLayers: ['transit', 'trails']
}

// @UPDATE
// const sceneLayers = {
//     stress: {
//         regionalScene,
//         usingDataScene,
//         lowStressOneScene,
//         lowStressTwoScene,
//     },
//     connectivity: {
//         connectivityOneScene,
//         connectivityTwoScene,
//         connectivityEquityScene,
//         connectivityPrioritiesScene,
//         connectivityPrioritiesEquityScene
//     },
//     special: {
//         trailsScene,
//         transitScene,
//         schoolsScene
//     }
// }

// @UPDATE one obj b/c just referencing by ID at this point
const sceneLayers = {
    regionalScene,
    usingDataScene,
    lowStressOneScene,
    lowStressTwoScene,
    bufferOneScene,
    connectivityOneScene,
    connectivityTwoScene,
    connectivityEquityScene,
    connectivityPrioritiesScene,
    connectivityPrioritiesEquityScene,
    bufferTwoScene,
    trailsScene,
    transitScene,
    schoolsScene
}

const baseLayers = {
    municipalityOutline,
    countyOutline
}

export { baseLayers, sceneLayers }