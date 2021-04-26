const layers = {
    countyOutline: {
        'id': 'county-outline',
        'type': 'line',
        'source': 'boundaries',
        'source-layer': 'county',
        'paint': {
            'line-width': 2.5,
            'line-color': '#242424'
            // 'line-color': '#e9e9e9'
        },
        'filter': ['==',
            'dvrpc', 'Yes'
        ]
    },
    muniOutline: {
        'id': 'municipality-outline',
        'type': 'line',
        'source': 'boundaries',
        'source-layer': 'municipalities',
        'paint': {
            'line-width': 0.5,
            'line-color': '#242424'
            // 'line-color': '#e9e9e9'
        }
    },
    // existingConditions: {
    //     id: 'existing-conditions',
    //     type: 'line',
    //     source: 'lts',
    //     'source-layer': 'existing_conditions_lts',
    //     'paint': {
    //         'line-width': ['interpolate', 
    //             ['linear'], ['zoom'],
    //             8.35, 0.33,
    //             10, 0.99,
    //             11, 1.5,
    //             17, 2.5,
    //             20, 3.5
    //         ],
    //         'line-color': ['match',
    //             ['get', 'lts_score'],
    //             1, '#498434',
    //             2, '#72bc58',
    //             3, '#fcd842',
    //             4, '#a50a0a',
    //             '#fff'
    //         ]
    //     }
    // }
}

export default layers