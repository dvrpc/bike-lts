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

const selectContentUpdates = {
    ['regional-connectivity']: `
        <fieldset class="sidebar-fieldset">
            <legend>Levels of Traffic Stress (LTS)</legend>

            <label class="sidebar-form-label">
                <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-1" checked>
                LTS 1
            </label>
            
            <label class="sidebar-form-label">
                <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-2" checked>
                LTS 2
            </label>

            <label class="sidebar-form-label">
                <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-3" checked>
                LTS 3
            </label>
            
            <label class="sidebar-form-label lts-layer-4">
                <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-4" checked>
                LTS 4
            </label>
        </fieldset>
    `,
    ['low-stress']: `
        <fieldset class="sidebar-fieldset">
            <legend>Low-Stress Areas</legend>
                <label class="sidebar-form-label side-form-label-lts">
                    <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="lowstress" name="lowstress-islands" value="lowstress-islands" checked>
                    low-stress areas
                </label>

                <label class="sidebar-form-label">
                    <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-3">
                    LTS 3
                </label>
                
                <label class="sidebar-form-label">
                    <input type="checkbox" class="sidebar-form-checkbox core-lts" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-4">
                    LTS 4
                </label>
                <hr class="sidebar-form-hr" />
                <p>Low-stress areas include connected LTS 1 and LTS 2 segments. LTS 3 and LTS 4 layers are provided separately for context.</p>
        </fieldset>
    `
}

export { ltsFilters, analysisLookup, selectContentUpdates }