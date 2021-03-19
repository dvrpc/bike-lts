const layers = {
    countyOutline: {
        "id": "county-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "county",
        "paint": {
            'line-width': 2.5,
            'line-color': '#383838'
        },
        "filter": [
            "==",
            "dvrpc",
            "Yes"
        ]
    },
    muniOutline: {
        "id": "municipality-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "municipalities",
        "paint": {
            'line-width': 0.5,
            'line-color': '#383838'
        }
    },
    // lowstressIslands: {
    //     id: "lowstress-islands",
    //     type: "line",
    //     source: "lts",
    //     "source-layer": "lowstress_islands",
    //     "paint": {
    //         "line-width": 0.25,
    //         "line-color": "#498434"
    //     }
    // },
    // existingConditions: {
    //     id: "existing-conditions",
    //     type: "line",
    //     source: "lts",
    //     "source-layer": "existing_conditions_lts",
    //     "paint": {
    //         "line-width": 0.5,
    //         "line-color": [
    //             'match', ['get', 'lts'],
    //             "LTS 1", '#498434',
    //             "LTS 2", '#72bc58',
    //             "LTS 3", '#fcd842',
    //             "LTS 4", '#a50a0a',
    //             '#fff'
    //         ]
    //     }
    // }
    // add more layers here
}

export default layers