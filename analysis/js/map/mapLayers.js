const layers = {
    muniOutline: {
        'id': 'municipality-outline',
        'type': 'line',
        'source': 'boundaries',
        'source-layer': 'municipalities',
        'paint': {
            'line-width': 0.75,
            'line-color': '#a4a4a4'
        }
    },
    countyOutline: {
        'id': 'county-outline',
        'type': 'line',
        'source': 'boundaries',
        'source-layer': 'county',
        'paint': {
            'line-width': 2.5,
            'line-color': '#242424'
        },
        'filter': ['==',
            'dvrpc', 'Yes'
        ]
    },
    existingConditions: {
        id: 'existing-conditions',
        type: 'line',
        source: 'lts',
        'source-layer': 'existing_conditions_lts',
        'paint': {
            'line-width': ['interpolate', 
                ['linear'], ['zoom'],
                8.35, 0.33,
                10, 0.99,
                11, 2.5,
                17, 3,
                20, 4
            ],
            'line-color': ['match',
                ['get', 'lts_score'],
                1, '#396829',
                2, '#a4bc58',
                3, '#fcd842',
                4, '#a50a0a',
                '#fff'
            ]
        }
    },
    // 'lowstress-click': {
    //     id: 'lowstress-click',
    //     type: 'line',
    //     source: 'lts',
    //     'source-layer': 'lowstress_islands',
    //     paint: {
    //         'line-width': ['interpolate', 
    //             ['linear'], ['zoom'],
    //             8.35, 1.2,
    //             10, 1.8,
    //             11, 3,
    //             17, 5,
    //             20, 7
    //         ],
    //         'line-color': '#fff',
    //         'line-dasharray': [2, 0.5]
    //     },
    //     filter: ['==',
    //         'island_num', 0
    //     ]
    // }
}

export default layers