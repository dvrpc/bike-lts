////
// Basemap layers
////
const countyOutline = {
    id: 'county-outline',
    type: 'line',
    source: 'boundaries',
    'source-layer': 'county',
    paint: {
        'line-width': 2.5,
        'line-color': '#838383'
    },
    filter: [
        '==',
        'dvrpc',
        'Yes'
    ]
}
const municipalityOutline = {
    id: 'municipality-outline',
    type: 'line',
    source: 'boundaries',
    'source-layer': 'municipalities',
    paint: {
        'line-width': 0.5,
        'line-color': '#838383'
    }
}


////
// Scene objects
////
// lts scenes
const regionalScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: [
        {
            id: 'lts-scene',
            type: 'line',
            source: 'lts',
            'source-layer': 'existing_conditions_lts',
            'paint': {
                'line-width': 0.5,
                'line-color': ['match',
                    ['get', 'lts_score'],
                    1, '#498434',
                    2, '#72bc58',
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
    center: [-75.703, 40.006],
    layers: [
        {
            id: 'lts-scene',
        }
    ],
    hideLayers: []
}
const lowStressOneScene = {
    zoom: 12.5,
    center: [-75.703, 40.006],
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
    center: [-75.703, 40.006],
    layers: [
        {
            id: 'lts-scene',
            filter: ['<', 'lts_score', 4]
        }
    ],
    hideLayers: []
}

// connectivity analysis scenes
const connectivityOneScene = {
    zoom: 13.5,
    center: [-75.703, 40.006],
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
    hideLayers: ['priority-top', 'results-all']
}
const connectivityTwoScene = {
    zoom: 12.5,
    center: [-75.703, 40.006],
    layers: [
        {
            id: 'results-all',
            type: 'line',
            source: 'lts',
            'source-layer': 'results_all',
            paint: {
                'line-color': 'magenta',
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
            minzoom: 12
        },
        {
            id: 'priority-top',
            type: 'line',
            source: 'lts',
            'source-layer': 'priorities_all',
            paint: {
                'line-width': 4,
                'line-color': '#993404',
            },
            filter: ['==', 'main_priority', 10]
        }
    ],
    hideLayers: ['path', 'blocks', 'blocks-fill', 'priority-ipd', 'ipd-fill']
}
const connectivityEquityScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
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
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: [
        {
            id: 'priority-top',
            filter: ['==', 'main_priority', 10]
        }
    ],
    hideLayers: ['priority-ipd', 'priority-top-ipd', 'ipd-fill']
}
const connectivityPrioritiesEquityScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
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
        }
    ],
    hideLayers: []
}

// special destinations
const trailsScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
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
    zoom: 8.5,
    center: [-75.2273, 40.071],
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
    zoom: 8.5,
    center: [-75.2273, 40.071],
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

const sceneLayers = {
    stress: {
        regionalScene,
        usingDataScene,
        lowStressOneScene,
        lowStressTwoScene,
    },
    connectivity: {
        connectivityOneScene,
        connectivityTwoScene,
        connectivityEquityScene,
        connectivityPrioritiesScene,
        connectivityPrioritiesEquityScene
    },
    special: {
        trailsScene,
        transitScene,
        schoolsScene
    }
}

const baseLayers = {
    countyOutline,
    municipalityOutline
}

export { baseLayers, sceneLayers }