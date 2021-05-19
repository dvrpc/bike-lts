const getFirstSymbolId = map => {
    const layers = map.getStyle().layers;

    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') return layers[i].id;
    }
}

const mapUtils = { getFirstSymbolId }

export default mapUtils