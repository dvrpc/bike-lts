const highlightLayers = ['lowstress-islands']

const highlightLowStress = (map, e) => {
    const features = e.features[0]
    const id = features.properties.island_num
    console.log('e target props', id)
    const filter = []
    
    // @NOTE: feature state isn't really an option
        //dash-array doesn't support it
        // it can't be used on line-width b/c of existing zoom interpolation
        // opacity doesn't make sense b/c default opacity has to be 1 and 
        // clicked opacity would mean all !ID features get <1 opacity
    // fallback option is a separate layer called lowstress-clicked
        // add it as part of the basemap. Filter all out, no visibility
        // define line-width as thicker than base areas or add dash-array
        // clicking uses the ID to apply a filter on that layer
}

export { highlightLowStress, highlightLayers }