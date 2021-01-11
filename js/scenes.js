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
        toggleAnimation(e, scenes[i])
        toggleNavLink(e, scenes[i])
        toggleMapView(e)
    }))
}

// helper fncs to animate scene in/out, update side-nav link state and update map (when applicable)
// el scene format: <section><article><figure></section>
const toggleAnimation = (e, el) => {
    console.log('el on enter ', el.children[0])
    

}
const toggleNavLink = (e, el) => {

}
// @TODO escape no-map cases
const toggleMapView = e => {

}

export default sceneObjs