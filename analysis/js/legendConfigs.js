// objects with info for each legend type
const legendConfigs = {
    lts: {
        title: 'Levels of Traffic Stress',
        icons: ['var(--theme-green)', 'var(--theme-green-2)', 'var(--theme-yellow)', 'var(--theme-red)'],
        text: ['LTS 1', 'LTS 2', 'LTS 3', 'LTS 4']
    },
    priorities: {
        title: 'Regional Connectivity to Priorities',
        icons: ['#ffffd4', '#fed98e', '#fe9929', '#d95f0e', '#993404'],
        iconType: 'line',
        text: ['top 10%', 'top 20%', 'top 30%', 'top 40%', 'top 50%']        
    },
    schools: {
        title: 'Priority Connections to Schools',
        icons: ['#984ea3'],
        iconType: 'line',
        text: ['Roads that would enable low-stress connections to schools within 2 miles']
    },
    trails: {
        title: 'Priority Connections to Trails',
        icons: ['#377eb8'],
        iconType: 'line',
        text: ['Roads that would enable low-stress connections to trails within 2.5 miles']
    },
    transit: {
        title: 'Priority Connections to Transit',
        icons: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462'],
        iconType: 'line',
        text: ['bus','rail','rail, bus','rail, trolley','trolley','trolley, bus']
    },
    facilities: {
        title: 'Bicycle Facilities',
        icons: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628'],
        iconType: 'line',
        text: ['Bike Lane','Bike Route','Buffered Bike Lane','No Accomodation','Off-road Trail/Path','Protected Bike Lane','Sharrows']
    },
    access: {
        title: 'Trail Access Locations',
        icons: ['#377eb8'],
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
        title: 'Low-stress Islands',
        icons: [],
        iconType: '',
        text: ['Different colors represent distinct low-stress (LTS 1 & 2) islands']
    }
}

export default legendConfigs