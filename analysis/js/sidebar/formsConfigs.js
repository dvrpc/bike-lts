// LTS filters
const ltsFilters = {
    'lts-1': [
        ['==', 'lts_score', 1]
    ],
    'lts-2': [
        ['==', 'lts_score', 2]
    ],
    'lts-3': [
        ['==', 'lts_score', 3]
    ],
    'lts-4': [
        ['==', 'lts_score', 4]
    ]
}

// order matters - mapbox prioritizes layers by order & we want analysis on top
const specialDestinationLayers = {
    school: ['schools-combined', 'school', 'school-ipd'],
    trails: ['trail-access', 'trails', 'trails-ipd'],
    transit: ['trolley', 'passenger-rail', 'bus', 'transit', 'transit-ipd'],
    priority: ['priority', 'priority-ipd']
}

export { ltsFilters, specialDestinationLayers }