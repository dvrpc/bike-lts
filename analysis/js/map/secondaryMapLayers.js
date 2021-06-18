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
                10, 0.99,
                11, 1.5,
                17, 2.5,
                20, 3.5
            ],
            'line-color': ['step',
                ['get', 'island_num'],
                '#fff',
                // large concentration of islands in the 18000 range. These steps have no inherent value, they're about visual distinction
                18561, '#8dd3c7',
                18571, '#ffffb3',
                18581, '#bebada',
                18600, '#fb8072',
                18700, '#80b1d3',
                20000, '#fdb462',
                22000, '#b3de69',
                24000, '#fccde5',
                26000, '#d9d9d9',
                28000, '#bc80bd',
                32000, '#ccebc5',
                33505, '#ffed6f'
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
                11, 1.5,
                17, 2.5,
                20, 3.5
            ],
            'line-color': ['match',
                ['get', 'main_priority'],
                10, '#993404',
                20, '#d95f0e',
                30, '#fe9929',
                40, '#fed98e',
                50, '#ffffd4',
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
                11, 1.5,
                17, 2.5,
                20, 3.5
            ],
            'line-color': ['match',
                ['get', 'main_priority_ipd'],
                10, '#993404',
                20, '#d95f0e',
                30, '#fe9929',
                40, '#fed98e',
                50, '#ffffd4',
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
                11, 1.5,
                17, 2.5,
                20, 3.5
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
                11, 1.5,
                17, 2.5,
                20, 3.5
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
                11, 1.5,
                17, 2.5,
                20, 3.5
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
                11, 1.5,
                17, 2.5,
                20, 3.5
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
                11, 1.5,
                17, 2.5,
                20, 3.5
            ],
            'line-color': '#fdb462'
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
                11, 1.5,
                17, 2.5,
                20, 3.5
            ],
            'line-color': '#fdb462'
        }
    },
    // Resource Layers
    facilities: {
        id: 'facilities',
        type: 'line',
        source: 'lts',
        'source-layer': 'existing_conditions_lts',
        paint: {
            'line-width': ['interpolate',
                ['linear'], ['zoom'],
                8.35, 3,
                11, 1.5,
                17, 2.5,
                20, 3.5
            ],
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
            'circle-color': '#498434',
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1
        }
    },
    trolley: {
        id: 'trolley',
        type: 'circle',
        source: 'lts',
        'source-layer': 'trolley',
        paint: {
            'circle-radius': ['interpolate',
                ['linear'], ['zoom'],
                1, 1,
                7, 3,
                11, 4
            ],
            'circle-color': ['match',
                ['get', 'direction'],
                'Eastbound', '#984ea3',
                'Westbound', '#4e2853',
                '#fff'
            ],
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1
        }
    },
    bus: {
        id: 'bus',
        type: 'circle',
        source: 'lts',
        'source-layer': 'bus_region',
        paint: {
            'circle-radius': ['interpolate',
                ['linear'], ['zoom'],
                1, 1,
                7, 3,
                11, 4
            ],
            'circle-color': ['match',
                ['get', 'layer'],
                'NJTBus', '#f18541',
                'SEPTABus', '#487997',
                '#fff'
            ],
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1
        }
    },
    'schools-combined': {
        id: 'schools-combined',
        type: 'circle',
        source: 'lts',
        'source-layer': 'schools_combined_region',
        paint: {
            'circle-radius': ['interpolate',
                ['linear'], ['zoom'],
                1, 1,
                7, 3,
                11, 4
            ],
            'circle-color': ['match',
                ['get', 'layer'],
                'priv_schools_2012', '#66c2a5',
                'pub_schools_2013', '#fc8d62',
                '#fff'
            ],
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1
        }
    }
}

export default layers