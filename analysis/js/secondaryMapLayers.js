const layers = {
    'lowstress-islands': {
        id: 'lowstress-islands',
        type: 'line',
        source: 'lts',
        'source-layer': 'lowstress_islands',
        'paint': {
            'line-width': ['interpolate', 
                ['linear'], ['zoom'],
                8.35, 0.33,
                10, 0.66,
                11, 1
            ],
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
                8.35, 3,
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
    'priority-ipd': {
        id: 'priority-ipd',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_all_ipd',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                8.35, 3,
                10, 2,
                11, 1
            ],
            'line-color': ['match',
                ['get', 'main_priority_ipd'],
                10, '#ffffd4',
                20, '#fed98e',
                30, '#fe9929',
                40, '#d95f0e',
                50, '#993404',
                'rgba(0,0,0,0)'
            ]
        }
    },
    school: {
        id: 'school',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_school',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                8.35, 3,
                10, 2,
                11, 1
            ],
            'line-color':'#984ea3'
        }
    },
    'school-ipd': {
        id: 'school-ipd',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_school_ipd',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                8.35, 3,
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
                8.35, 3,
                10, 2,
                11, 1
            ],
            'line-color': '#377eb8'
        }
    },
    'trails-ipd': {
        id: 'trails-ipd',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_trail_ipd',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                8.35, 3,
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
                8.35, 3,
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
    },
    'transit-ipd': {
        id: 'transit-ipd',
        type: 'line',
        source: 'lts',
        'source-layer': 'priorities_alltransit_ipd',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                8.35, 3,
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
    },
    // Resource Layers
    facilities: {
        id: 'facilities',
        type: 'line',
        source: 'lts',
        'source-layer': 'existing_conditions_lts',
        paint: {
            'line-width': 0.33,
            'line-color': ['match',
                ['get', 'bikefacili'],
                'Bike Lane', '#8dd3c7',
                'Bike Route', '#ffffb3',
                'Buffered Bike Lane', '#bebada',
                'Off-road Trail/Path', '#fb8072',
                'Protected Bike Lane', '#80b1d3',
                'Sharrows', '#fdb462',
                'rgba(0,0,0,0)'
            ]
        }
    },
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
    'trail-access': {
        id: 'trail-access',
        type: 'circle',
        source: 'lts',
        'source-layer': 'bikefacintersect',
        paint: {
            'circle-radius': ['interpolate',
                ['linear'], ['zoom'],
                1, 1,
                7, 3,
                11, 4
            ],
            'circle-color': '#377eb8',
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1
        }
    }
}

export default layers