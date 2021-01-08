// get scene sections
const scenes = document.querySelectorAll('.scene-section')
const l = scenes.length
const sceneObjs = []

// create scene objects
for(let i = 0; i < l; i++) {
    sceneObjs.push( new ScrollMagic.Scene({
        duration: 100,
        triggerElement: scenes[i],
        reverse: true
    })
    .on('enter', e => {
        toggleAnimation(e)
        toggleNavLink(e)
        toggleMapView(e)
    }))
}

// helper fncs to animate scene in/out, update side-nav link state and update map (when applicable)
const toggleAnimation = e => {

}
const toggleNavLink = e => {

}
// @TODO escape no-map cases
const toggleMapView = e => {

}

export default sceneObjs