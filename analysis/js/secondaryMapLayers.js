const layers = {
    // Resource Layers
    'passenger-rail': {
        id: 'passenger-rail',
        type: 'circle',
        source: 'lts',
        'source-layer': 'passengerrail',
        paint: {
            'circle-radius': ['interpolate',
                ['linear'], ['zoom'],
                1, 1,
                7, 3,
                11, 4
            ],
            'circle-color': ['match',
                ['get', 'operator'],
                'Amtrak', '#004d6e',
                'NJ Transit', '#f18541',
                'PATCO', '#ed164b',
                'SEPTA', '#487997',
                '#fff'
            ],
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1
        }
    },
    facilities: {
        id: 'facilities',
        type: 'line',
        source: 'lts',
        'source-layer': 'existing_conditions_lts',
        paint: {
            'line-width': 0.33,
            'line-color': ['match',
                ['get', 'bikefacili'],
                'Bike Lane', '#e41a1c',
                'Bike Route', '#377eb8',
                'Buffered Bike Lane', '#4daf4a',
                'No Accomodation', '#984ea3',
                'Off-road Trail/Path', '#ff7f00',
                'Protected Bike Lane', '#ffff33',
                'Sharrows', '#a65628',
                'rgba(0,0,0,0)'
            ]
        }
    },
    // Analysis Layers
    priority: {
        id: 'priority',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_all',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                7.3, 3,
                10, 2,
                11, 1
            ],
            'line-color': ['match',
                ['get', 'main_priority'],
                10, '#ffffd4',
                20, '#fed98e',
                30, '#fe9929',
                40, '#d95f0e',
                50, '#993404',
                'rgba(0,0,0,0)'
            ]
        }
    },
    schools: {
        id: 'schools',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_schools',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                7.3, 3,
                10, 2,
                11, 1
            ],
            'line-color':'#984ea3'
        }
    },
    trails: {
        id: 'trails',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_trail',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                7.3, 3,
                10, 2,
                11, 1
            ],
            'line-color': '#377eb8'
        }
    },
    transit: {
        id: 'transit',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_alltransit',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                7.3, 3,
                10, 2,
                11, 1
            ],
            'line-color': ['match',
                ['get', 'mode'],
                'bus', '#8dd3c7',
                'rail', '#ffffb3',
                'rail, bus', '#bebada',
                'rail, trolley', '#fb8072',
                'trolley', '#80b1d3',
                'trolley, bus', '#fdb462',
                'rgba(0,0,0,0)'
            ]
        }
    }
}

export default layers