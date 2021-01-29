const toggleAnimation = el => {
    const text = el.children[1] ? el.children[1] : el.children[0]
    text.classList.add('fadein')
}

const toggleNavLink = (btns, i) => {
    // remove active class from all links
    btns.forEach(btn => btn.classList.remove('scroll-story-nav-link-active'))

    // add active class to current scene
    btns[i].classList.add('scroll-story-nav-link-active')
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

const getMapCategory = el => {
    const prev = el.previousElementSibling
    if(prev.classList.contains('map')) return prev
    else return getMapCategory(prev)
}

export { toggleAnimation, toggleNavLink, makeNavTooltip, removeNavTooltip, getMapCategory }