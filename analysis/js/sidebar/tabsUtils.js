// since filter won't let a conditional (i.e. layer != 'county-outline' || layer != 'municipality-outline'), hack for -outline
// @NOTE this will break if a base layer with -outline is added
const geoCallback = layer => {
    return layer.split('-')[1] != 'outline'
}

export { geoCallback }