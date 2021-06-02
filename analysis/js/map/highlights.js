const highlightLayers = ['lowstress-islands']

const highlightLowStress = (map, e) => {
    const features = e.features[0]
    const id = features.properties.island_num
    const filter = ['==', 'island_num', id]
    
    map.setFilter('lowstress-click', filter)
}

export { highlightLowStress, highlightLayers }