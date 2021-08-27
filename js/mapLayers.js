////
// Basemap layers
////
const countyOutline = {
    id: 'county-outline',
    type: 'line',
    source: 'Boundaries',
    'source-layer': 'county',
    paint: {
        'line-width': 2.5,
        'line-color': '#fff'
    },
    filter: [
        '==',
        'dvrpc',
        'Yes'
    ]
}
const countyFill = {
    id: 'county-fill',
    type: 'fill',
    source: 'Boundaries',
    'source-layer': 'county',
    layout: {},
    paint: {
        'fill-color': '#383838',
        'fill-opacity': 1 
    },
    filter: [
        '==',
        'dvrpc',
        'Yes'
      ],
}
const municipalityOutline = {
    id: 'municipality-outline',
    type: 'line',
    source: 'Boundaries',
    'source-layer': 'municipalities',
    paint: {
        'line-width': 0.5,
        'line-color': '#f7f7f7'
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
                'line-width': 5,
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
    zoom: 11.5,
    center: [-75.703, 40.006],
    layers: [
        {
            id: 'lts-scene'
        }
    ]
}
const lowStressOneScene = {
    zoom: 11.5,
    center: [-75.703, 40.006],
    layers: [
        {
            id: 'lts-scene',
            filter: ['<', 'lts_score', 3]
        }
    ],
}
const lowStressTwoScene = {
    zoom: 11.5,
    center: [-75.703, 40.006],
    layers: [
        {
            id: 'lts-scene',
            filter: ['<', 'lts_score', 4]
        }
    ],
}
const connectivityOneScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: {

    },
    filter: null
}
const connectivityTwoScene = {
    zoom: 9.6,
    center: [-75.0173, 40.171],
    layers: {

    },
    filter: null
}
const connectivityPrioritiesScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: {

    },
    filter: null
}
const trailsScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: {

    },
    filter: null
}
const transitScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: {

    },
    filter: null
}
const schoolsScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071],
    layers: {

    },
    filter: null
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
        connectivityPrioritiesScene,
    },
    special: {
        trailsScene,
        transitScene,
        schoolsScene
    }
}

export { countyOutline, countyFill, municipalityOutline, sceneLayers }