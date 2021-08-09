// LTS filters
const ltsFilters = {
    'existing-conditions': false,
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

const analysisLookup = ['priority', 'school', 'trails', 'transit', 'priority-ipd', 'school-ipd', 'trails-ipd', 'transit-ipd']

export { ltsFilters, analysisLookup }