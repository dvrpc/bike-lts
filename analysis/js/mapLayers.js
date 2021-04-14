const layers = {
    countyOutline: {
        'id': 'county-outline',
        'type': 'line',
        'source': 'boundaries',
        'source-layer': 'county',
        'paint': {
            'line-width': 2.5,
            'line-color': '#f7f7f7'
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
            'line-color': '#f7f7f7'
        }
    },
    existingConditions: {
        id: 'existing-conditions',
        type: 'line',
        source: 'lts',
        'source-layer': 'existing_conditions_lts',
        'paint': {
            'line-width': 0.33,
            'line-color': ['match',
                ['get', 'lts_score'],
                1, '#498434',
                2, '#72bc58',
                3, '#fcd842',
                4, '#a50a0a',
                '#fff'
            ]
        }
    },
    lowStressIslands: {
        id: 'lowstress-islands',
        type: 'line',
        source: 'lts',
        'source-layer': 'lowstress_islands',
        'paint': {
            'line-width': 0.33,
            'line-color': ['step',
                ['get', 'island_num'],
                '#fff',
                18561, '#8dd3c7',
                20055, '#ffffb3',
                21549, '#bebada',
                23043, '#fb8072',
                24537, '#80b1d3',
                26031, '#fdb462',
                27525, '#b3de69',
                29019, '#fccde5',
                30513, '#d9d9d9',
                32007, '#bc80bd'
            ]
        }
    }
}

export default layers