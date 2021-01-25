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
    }))
}

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
const makeNavTooltip = el => {
    const idToHeader =el.id.split('-').join(' ')

    return `
        <span>
            ${idToHeader}
        </span>
    `
}
// @TODO escape no-map cases
const toggleMapView = e => {

}

export default sceneObjs