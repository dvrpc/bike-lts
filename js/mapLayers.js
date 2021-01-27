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

// attributes that could update per scene
    // zoom level
    // center
    // line layers (filters)
// updating the maps
    // togglemapview in scenes.js needs to get a handle on the correct map instances
        // each map instance belongs to a particular group - stress, connectivity or special
        // add data-* attributes to each map element HTML
            // data-* to signify groups i.e. data-map-stress, data-map-connectivity, data-map-special
        // when creating scenes, check for the data-* attribute on a given scene
            // if data-* map attribute is present, add toggleMapView hook to the onenter jawn (ignore otherwise)
            // pass the data-* attribute (so it can know which section to select) and the scene id (so it can know which specific scene to select from the section) to toggleMapView
    // from each group, select the scene obj that corresponds to the current scene
        // iterate over the scene obj and apply the values from each key onto the corresponding map value
            // scene obj and map attributes need to be the same
const regionalScene = {

}
const usingDataScene = {

}
const lowStressOneScene = {

}
const lowStressTwoScene = {

}
const connectivityOneScene = {

}
const connectivityTwoScene = {
    
}
const connectivityPrioritiesScene = {
    
}
const trailsScene = {

}
const transitScene = {

}
const schoolsScene = {

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
export { countyOutline, countyFill, municipalityOutline }