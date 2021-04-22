// objects with info for each legend type
const legendConfigs = {
    lts: {
        title: 'LTS Layers',
        icons: ['var(--theme-green)', 'var(--theme-green-2)', 'var(--theme-yellow)', 'var(--theme-red)'],
        text: ['LTS 1', 'LTS 2', 'LTS 3', 'LTS 4']
    },
    priorities: {
        title: 'Regional Connectivity to Priorities',
        icons: ['#ffffd4', '#fed98e', '#fe9929', '#d95f0e', '#993404'],
        text: ['10', '20', '30', '40', '50']        
    },
    schools: {
        title: '',
        icons: [],
        text: []        
    },
    trails: {
        title: '',
        icons: [],
        text: []        
    },
    transit: {
        title: '',
        icons: [],
        text: []            
    }
}

export default legendConfigs