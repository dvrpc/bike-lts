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
            'line-color': ['match',
                ['get', 'bin'],
                1, '#feebe2',
                2, '#fbb4b9',
                3, '#f768a1',
                4, '#c51b8a',
                5, '#7a0177',
                '#fff'
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
                11, 3.25,
                17, 3.5,
                20, 4
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
                11, 3.25,
                17, 3.5,
                20, 4
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
                11, 3.25,
                17, 3.5,
                20, 4
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
                11, 3.25,
                17, 3.5,
                20, 4
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
                11, 3.25,
                17, 3.5,
                20, 4
            ],
            'line-color': '#498434'
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
                11, 3.25,
                17, 3.5,
                20, 4
            ],
            'line-color': '#498434'
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
                11, 3.25,
                17, 3.5,
                20, 4
            ],
            'line-color': '#F49FBC'
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
                11, 3.25,
                17, 3.5,
                20, 4
            ],
            'line-color': '#F49FBC'
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
                11, 3.25,
                17, 3.5,
                20, 4
            ],
            'line-color': ['match',
                ['get', 'bikefacili'],
                'Bike Lane', '#123899',
                'Bike Route', '#ffffb3',
                'Buffered Bike Lane', '#29c2eb',
                'Off-road Trail/Path', '#56bd49',
                'Protected Bike Lane', '#bebada',
                'Sharrows', '#ff872c',
                'rgba(0,0,0,0)'
            ],
            // comment out until we figure out how to handle facilities
            // 'line-dasharray': [0.75, 3]
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
                1, 0.5,
                8, 0.7,
                11, 3.5,
                19, 5
            ],
            'circle-color': '#f18541',
            'circle-stroke-color': '#9d440c',
            'circle-stroke-width': 1.5
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
                1, 0.5,
                8, 0.7,
                11, 3.5,
                19, 5
            ],
            'circle-color': '#377eb8',
            'circle-stroke-color': '#132b3f',
            'circle-stroke-width': 1.5
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
                1, 0.5,
                8, 0.7,
                11, 3.5,
                19, 5
            ],
            'circle-color': '#ed164b',
            'circle-stroke-color': '#4d0617',
            'circle-stroke-width': 1.5
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
                1, 0.5,
                8, 0.7,
                11, 3.5,
                19, 5
            ],
            'circle-color': '#004d6e',
            'circle-stroke-color': '#002433',
            'circle-stroke-width': 1.5
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
                1, 0.5,
                8, 0.7,
                11, 3.5,
                19, 5
            ],
            'circle-color': ['match',
                ['get', 'layer'],
                'priv_schools_2012', '#66c2a5',
                'pub_schools_2013', '#fc8d62',
                '#fff'
            ],
            'circle-stroke-color': ['match',
                ['get', 'layer'],
                'priv_schools_2012', '#17392e',
                'pub_schools_2013', '#5d1b02',
                '#fff'
            ],
            'circle-stroke-width': 1.5
        }
    }
}

export default layers