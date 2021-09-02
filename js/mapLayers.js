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
// attributes that could update per scene
    // zoom level
    // center
    // line layers 
        // new layers
        // filters
    // the nature of scrolling means layers will be added sequentially
        // kind of a dicey gamble but in theory, adding the layer config to the
        // first instance of a layer could be enough to have following layers reference it


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
        },
        {
            id: 'lts-facilities',
            type: 'line',
            source: 'lts',
            'source-layer': 'existing_conditions_lts',
            paint: {
                'line-width': 4,
                'line-color': ['match',
                    ['get', 'bikefacili'],
                    'Bike Lane', '#123899',
                    'Bike Route', '#ffffb3',
                    'Buffered Bike Lane', '#29c2eb',
                    'Protected Bike Lane', '#bebada',
                    'Sharrows', '#ff872c',
                    'rgba(0,0,0,0)'
                ],
            }
        }
    ]
}
const usingDataScene = {
    zoom: 12.5,
    center: [-75.703, 40.006],
    layers: [
        {
            id: 'lts-facilities'
        }
    ]
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
}

// connectivity analysis scenes
// @TODO: shortest path jawn
    // sarah will provide geometry
// @TODO: LTS lines
    // try keeping the 3 separate base maps and constraining the LTS layers on connectivity + priority
    // to a max zoom level (12.5) so that it only renders that specific segment, never the full network
const connectivityOneScene = {
    zoom: 12.5,
    center: [-75.703, 40.006],
    layers: [
        // {
        //     id: ''
        // }
    ],
}
const connectivityTwoScene = {
    zoom: 12.5,
    center: [-75.703, 40.006],
    layers: [
        {
            id: 'priority',
            type: 'line',
            source: 'lts',
            'source-layer': 'priorities_all',
            paint: {
                'line-width': 4,
                'line-color': ['match',
                    ['get', 'main_priority'],
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
}
const equityFocusedConnectivityScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: [
        {
            id: 'priority'
        }
    ]
}
const connectivityPrioritiesScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: [
        {
            id: 'priority'
        }
    ]
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
    ]
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
    ]
}
const schoolsScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: [
        {
            id: 'school',
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
    ]
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
        equityFocusedConnectivityScene,
        connectivityPrioritiesScene,
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