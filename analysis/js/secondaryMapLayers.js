const layers = {
    'passenger-rail': {
        id: 'passenger-rail',
        type: 'circle',
        source: 'lts',
        'source-layer': 'passengerrail',
        paint: {
            'circle-radius': [
                'interpolate', ['linear'], ['zoom'],
                1, 1,
                7, 3,
                11, 4
            ],
            'circle-color': [
                'match', ['get', 'operator'],
                'Amtrak', '#004d6e',
                'NJ Transit', '#f18541',
                'PATCO', '#ed164b',
                'SEPTA', '#487997',
                '#fff'
            ],
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 2
        }
    },
    // b/c of the fallback, all of the analysis layers have to paint the entire existing conditions layer
    // toggling them on/off becomes really expensive cause it has to loop thru the entire network every time
    // the tradeoff is vt size & more efficient initial paint vs much more efficient toggling
    priority: {
        id: 'priority',
        type: 'line',
        source: 'lts',
        'source-layer': 'existing_conditions_lts',
        paint: {
            'line-width': 0.66,
            'line-color': [
                'match', ['get', 'main_priority'],
                10, '#ffffd4',
                20, '#fed98e',
                30, '#fe9929',
                40, '#d95f0e',
                50, '#993404',
                'rgba(0,0,0,0)'
            ]
        }
    }
    // @TODO add analysis layers
}

export default layers