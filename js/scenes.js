// get scene sections
const scenes = document.querySelectorAll('.scene-section')
const l = scenes.length
const sceneObjs = []

// get nav els minus hr
const scrollNav = document.getElementById('scroll-story-nav-ul').children
const scrollNavBtns = Array.from(scrollNav).filter(el => el.nodeName != 'HR')

// create scene objects
for(let i = 0; i < l; i++) {
    sceneObjs.push( new ScrollMagic.Scene({
        duration: 200,
        triggerElement: scenes[i],
        reverse: true
    })
    .on('enter', e => {
        toggleAnimation(e, scenes[i])
        toggleNavLink(i)
        toggleMapView(e)
        // update for map jawn:
        // data-map ? toggleMapView(e, data-map) : null
        // aka check for presence of map data attribute and invoke toggleMapView with it, or do nothing
    }))
}

// add scroll nav hover effects
scrollNavBtns.forEach(btn => {
    let tooltip;

    btn.onmouseover = e => {
        tooltip = makeNavTooltip(e)
        btn.insertAdjacentElement('afterend', tooltip)
    }

    btn.onmouseout = () => removeNavTooltip(tooltip)
})

// helper fncs to animate scene in/out, update side-nav link state and update map (when applicable)
const toggleAnimation = (e, el) => {
    const text = el.children[1] ? el.children[1] : el.children[0]
    text.classList.add('fadein')
}
const toggleNavLink = i => {
    // remove active class from all links
    scrollNavBtns.forEach(btn => btn.classList.remove('scroll-story-nav-link-active'))

    // add active class to current scene
    scrollNavBtns[i].classList.add('scroll-story-nav-link-active')
}
const makeNavTooltip = e => {
    let hrefToText = e.target.href.split('#')[1].split('-')
    hrefToText.pop()
    hrefToText = hrefToText.join(' ')
    
    const tooltipWrapper = document.createElement('span')
    const tooltip = document.createElement('span')
    
    tooltipWrapper.classList.add('scroll-story-nav-tooltip-wrapper')
    tooltip.classList.add('scroll-story-nav-tooltip')

    tooltip.textContent = hrefToText

    tooltipWrapper.appendChild(tooltip)
    
    return tooltipWrapper
}
const removeNavTooltip = tooltip => tooltip.remove()

// @TODO escape no-map cases
const toggleMapView = e => {

}

export default sceneObjs