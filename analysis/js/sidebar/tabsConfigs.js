// @UPDATES TEMP:
// look into resetAnalysisLayers and resetLTSLayers fncs to see if they're still needed
// for both of these strings, the form itself will have to be created via createElement to re-apply handleForms
    // all content within the form can be query strings
    // formsConfig objs already do this, just mimic that
    const demoLTS = `
    <form autocomplete="off" class="sidebar-form" aria-label="core LTS layers form" data-form-type="content-replace">
        <label class="sidebar-form-label">
            <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-all" checked>
            all LTS layers
        </label>

        <div class="sidebar-nested-inputs-wrapper">
            <label class="sidebar-form-label core-lts">
                <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-1" checked>
                LTS 1
            </label>
            
            <label class="sidebar-form-label core-lts">
                <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-2" checked>
                LTS 2
            </label>

            <label class="sidebar-form-label core-lts">
                <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-3" checked>
                LTS 3
            </label>
            
            <label class="sidebar-form-label lts-layer-4 core-lts">
                <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-4" checked>
                LTS 4
            </label>
        </div>
        </form>

        <hr class="sidebar-hr" />

        <form autocomplete="off" class="sidebar-form" aria-label="LTS reference form" data-form-type="content-replace">
        <div class="flex-column">
            <label class="sidebar-form-label side-form-label-lts">
                <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="lowstress" name="lowstress-islands" value="lowstress-islands">
                low-stress areas
            </label>
            
        <hr class="sidebar-hr" />

            <label class="sidebar-form-label">
                <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="facilities" name="layer" value="facilities">
                bicycle facilities
            </label>
        </div>
    </form>
`

const demoAnalysis = `
    <form autocomplete="off" class="sidebar-form flex-column" data-form-type="submit">
        <span class="sidebar-form-helper-text">
            The <em>Low-stress Network Connectivity </em> analysis is based on the calculation of shortest paths between census blocks across the region. LTS 3 segments are prioritized based on the number of low-stress connections they would enable.
        </span>

        <span class="sidebar-form-helper-text">
            In the <em>Equity-focused Network Connectivity </em> analysis, these shortest paths are weighted by the characteristics of the population living in the origin and destination census blocks, with emphasis on populations of interest under Title VI.
        </span>

        <label for="analysis-type-select" class="sidebar-form-label sidebar-select-label">
            select type:
        </label>

        <select class="sidebar-select" id="analysis-type-select">
            <option value="">Low-stress Network Connectivity</option>
            <option value="-ipd">Equity-focused Network Connectivity</option>
        </select>

        <label for="analysis-results-select" class="sidebar-form-label sidebar-select-label">
            select priority connections to:
        </label>

        <select class="sidebar-select" id="analysis-results-select">
            <option data-layer-type="toggle" data-legend-type="priorities" value="priority">everywhere</option>
            <option data-layer-type="toggle" data-legend-type="schools" value="school">schools</option>
            <option data-layer-type="toggle" data-legend-type="trails" value="trails">trails</option>
            <option data-layer-type="toggle" data-legend-type="transit" value="transit">transit</option>
        </select>

        <div class="flex-row flex-between">
            <button type="submit" class="btn-submit btn-action" id="get-analysis-btn">get results</button>
            <button type="button" class="btn-submit btn-cancel" id="clear-analysis-btn" aria-label="reset analysis layers">clear results</button>
        </div>
    </form>

    <hr class="sidebar-hr" />

    <form autocomplete="off" class="sidebar-form" aria-label="LTS reference form" data-form-type="content-replace">
        <label class="sidebar-form-label side-form-label-lts">
            <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="lowstress" name="lowstress-islands" value="lowstress-islands">
            low-stress areas
        </label>
        
        <hr class="sidebar-hr" />

        <label class="sidebar-form-label">
            <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="facilities" name="layer" value="facilities">
            bicycle facilities
        </label>
    </form>
`

const tabsContent = {
    'lts-tab': demoLTS,
    'connectivity-tab': demoAnalysis
}
// @UPDATES TEMP END

export default tabsContent