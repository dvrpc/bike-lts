import * as layers from './mapLayers.js'

const customStyles = {
    'version': 8,
    'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    'sources': {
        'Boundaries': {
            type: 'vector',
            url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
        }
    },
    'layers': [
        layers.countyFill,
        layers.countyOutline,
        layers.municipalityOutline
    ],
}

export { customStyles }