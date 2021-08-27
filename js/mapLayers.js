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
        'fill-color': 'rgb(136, 137, 140)',
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
// Scene layers
////
const regionalLayers = {
    id: 'regional-scene',
    type: 'line',
    source: ''
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
const regionalScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071]
}
const usingDataScene = {
    zoom: 10.5,
    center: [-75.3836, 40.101]
}
const lowStressOneScene = {
    zoom: 10.5,
    center: [-75.3836, 40.101]
}
const lowStressTwoScene = {
    zoom: 10.5,
    center: [-75.3836, 40.101]
}
const connectivityOneScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071]
}
const connectivityTwoScene = {
    zoom: 9.6,
    center: [-75.0173, 40.171]
}
const connectivityPrioritiesScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071]
}
const trailsScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071]
}
const transitScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071]
}
const schoolsScene = {
    zoom: 8.5,
    center: [-75.2273, 40.071]
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