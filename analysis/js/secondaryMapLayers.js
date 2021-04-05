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
            ]
        }
    },
}

export default layers