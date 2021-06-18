// objects with info for each legend type
const legendConfigs = {
    lts: {
        title: 'Levels of Traffic Stress',
        icons: ['var(--theme-green)', 'var(--theme-green-2)', 'var(--theme-yellow)', 'var(--theme-red)'],
        iconType: 'line',
        text: ['LTS 1', 'LTS 2', 'LTS 3', 'LTS 4']
    },
    priorities: {
        title: 'Regional Connectivity Priorities',
        icons: ['#993404', '#d95f0e', '#fe9929', '#fed98e', '#ffffd4'],
        iconType: 'line',
        text: ['top 10%', 'top 20%', 'top 30%', 'top 40%', 'top 50%']        
    },
    schools: {
        title: 'Priority Connections to Schools',
        icons: ['#984ea3'],
        iconType: 'line',
        text: ['LTS 3 road segments that would enable low-stress connections to schools within 2 miles']
    },
    trails: {
        title: 'Priority Connections to Trails',
        icons: ['#377eb8'],
        iconType: 'line',
        text: ['LTS 3 road segments that would enable low-stress connections to trails within 2.5 miles']
    },
    transit: {
        title: 'Priority Connections to Transit',
        icons: ['#bebada'],
        iconType: 'line',
        text: ['LTS 3 road segments that would enable low-stress connections to transit stops within 3 miles']
    },
    facilities: {
        title: 'Bicycle Facilities',
        icons: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462'],
        iconType: 'line',
        text: ['Bike Lane','Bike Route','Buffered Bike Lane','Off-road Trail/Path','Protected Bike Lane','Sharrows']
    },
    access: {
        title: 'Trail Access Locations',
        icons: ['#498434'],
        iconType: 'circle',
        text: ['Trailheads']
    },
    rail: {
        title: 'Passenger Rail Stations',
        icons: ['#004d6e','#f18541','#ed164b','#487997'],
        iconType: 'circle',
        text: ['Amtrak','NJ Transit','PATCO','SEPTA']
    },
    lowstress: {
        title: 'Low-stress Areas',
        icons: [''],
        iconType: '',
        text: ['Different colors represent distinct low-stress (LTS 1 & 2) areas']
    },
    trolley: {
        title: 'Trolley Stops',
        icons: ['#984ea3', '#4e2853'],
        iconType: 'circle',
        text: ['Eastbound', 'Westbound']
    },
    bus: {
        title: 'Bus Stops',
        icons: ['#f18541', '#487997'],
        iconType: 'circle',
        text: ['NJT Bus', 'SEPTA Bus']
    },
    'schools-combined': {
        title: 'Schools',
        icons: ['#fc8d62', '#66c2a5'],
        iconType: 'circle',
        text: ['public', 'private']
    }
}

export default legendConfigs