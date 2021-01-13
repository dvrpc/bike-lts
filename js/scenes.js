// get scene sections
const scenes = document.querySelectorAll('.scene-section')
const l = scenes.length
const sceneObjs = []

// create scene objects
for(let i = 0; i < l; i++) {
    sceneObjs.push( new ScrollMagic.Scene({
        duration: 200,
        triggerElement: scenes[i],
        reverse: false
    })
    .on('enter', e => {
        toggleAnimation(e, scenes[i])
        toggleNavLink(e, scenes[i])
        toggleMapView(e)
    }))
}

// helper fncs to animate scene in/out, update side-nav link state and update map (when applicable)
// el scene format: <section><article><figure></section>
const toggleAnimation = (e, el) => {
    const text = el.children[1] ? el.children[1] : el.children[0]
    text.classList.add('fadein')
}
const toggleNavLink = (e, el) => {

}
// @TODO escape no-map cases
const toggleMapView = e => {

}

export default sceneObjs