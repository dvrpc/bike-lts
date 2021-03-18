// general purpose form handler
const processForm = form => {

}

// return layer to be toggled
const toggleLayers = (form, map) => {
    form.onchange = e => {
        // @TODO: once a list of secondary/tertiary/etc layers is established, do a first-pass creation on the fly so that the default map loads as lightweight as possible
            // map secondaryMapLayers.js and export those objects into here so they can be appended to the map when needed

        const layer = e.target.value
        const visibility = e.target.checked ? 'visible' : 'none'
        
        map.setLayoutProperty(layer, 'visibility', visibility)
    }
}

// return filter to be applied
const filterLayers = values => {
    // process data

    // create filter

    // return filter
}

export { toggleLayers, filterLayers}