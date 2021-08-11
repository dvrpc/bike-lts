import handleForms from "./forms.js"

// LTS Form content
const ltsFormContent = `
    <label class="sidebar-form-label">
        <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="filter" data-legend-type="lts" name="existing-conditions" value="lts-all" checked>
        full LTS network
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
`
const ltsReferenceFormContent = `
    <label class="sidebar-form-label side-form-label-lts">
        <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="lowstress" name="lowstress-islands" value="lowstress-islands">
        low-stress areas
    </label>

    <hr class="sidebar-hr" />

    <label class="sidebar-form-label">
        <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="facilities" name="layer" value="facilities">
        bicycle facilities
    </label>
`

// Connectivity Analysis form content
const analysisFormContent = `
    <details class="sidebar-details">
        <summary class="sidebar-summary">What is Low-stress Network Connectivity?</summary>
        The <em>Low-stress Network Connectivity </em> analysis is based on the calculation of shortest paths between census blocks across the region. LTS 3 segments are prioritized based on the number of low-stress connections they would enable.
    </details>

    <details class="sidebar-details">
        <summary class="sidebar-summary">What is Equity-focused Network Connectivity?</summary>
        In the <em>Equity-focused Network Connectivity </em> analysis, these shortest paths are weighted by the characteristics of the population living in the origin and destination census blocks, with emphasis on populations of interest under Title VI.
    </details>

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
    </div>
`
const analysisReferenceFormContent = `
    <label class="sidebar-form-label side-form-label-lts">
        <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="lowstress" name="lowstress-islands" value="lowstress-islands">
        low-stress areas
    </label>

    <hr class="sidebar-hr" />

    <label class="sidebar-form-label">
        <input type="checkbox" class="sidebar-form-checkbox" data-layer-type="toggle" data-legend-type="facilities" name="layer" value="facilities">
        bicycle facilities
    </label>
`

// form fncs @TODO abstract into 1 generalized form creating fnc
const ltsTabForms = map => {
    const frag = document.createDocumentFragment()
    const ltsForm = document.createElement('form')
    const hr = document.createElement('hr')
    const referenceForm = document.createElement('form')
    const forms = [ltsForm, referenceForm]

    // insert content
    ltsForm.insertAdjacentHTML('afterbegin', ltsFormContent)
    referenceForm.insertAdjacentHTML('afterbegin', ltsReferenceFormContent)

    // set attributes and assign event handlers
    forms.forEach(form => {
        form.autocomplete = 'off'
        form.classList.add('sidebar-form', 'flex-column')
        form.dataset.formType = 'toggle'

        handleForms(form, map)
    })

    // add custom attributes
    ltsForm.ariaLabel = 'core LTS layers form'
    referenceForm.ariaLabel = 'LTS layers reference form'

    hr.classList.add('sidebar-hr')

    frag.appendChild(ltsForm)
    frag.appendChild(hr)
    frag.appendChild(referenceForm)

    return frag
}

const analysisTabForms = map => {
    const frag = document.createDocumentFragment()
    const analysisForm = document.createElement('form')
    const hr = document.createElement('hr')
    const referenceForm = document.createElement('form')
    const forms = [analysisForm, referenceForm]

    // insert content
    analysisForm.insertAdjacentHTML('afterbegin', analysisFormContent)
    referenceForm.insertAdjacentHTML('afterbegin', analysisReferenceFormContent)

    // set attributes and assign event handlers
    forms.forEach(form => {
        form.autocomplete = 'off'
        form.classList.add('sidebar-form', 'flex-column')

        handleForms(form, map)
    })

    // add custom attributes
    analysisForm.dataset.formType = 'submit'
    referenceForm.dataset.formType = 'toggle'
    analysisForm.ariaLabel = 'Connectivity analysis form'
    referenceForm.ariaLabel = 'Connectivity analysis reference form'

    hr.classList.add('sidebar-hr')

    frag.appendChild(analysisForm)
    frag.appendChild(hr)
    frag.appendChild(referenceForm)

    return frag
}

const tabsContent = {
    'lts-tab': ltsTabForms,
    'connectivity-tab': analysisTabForms,
}

const tabsLayersToSet = {
    'lts-tab': [],
    'connectivity-tab': ['priority']
}

export { tabsContent, tabsLayersToSet }