const layers = {
    countyOutline: {
        "id": "county-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "county",
        "paint": {
            'line-width': 2.5,
            'line-color': '#f7f7f7'
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
            'line-color': '#f7f7f7'
        }
    },
    existingConditions: {
        id: "existing-conditions",
        type: "line",
        source: "lts",
        "source-layer": "existing_conditions_lts",
        "paint": {
            "line-width": 0.33,
            "line-color": [
                'match', ['get', 'lts_score'],
                "1", '#498434',
                "2", '#72bc58',
                "3", '#fcd842',
                "4", '#a50a0a',
                '#fff'
            ]
        }
    }
    // add more layers here
}

export default layers