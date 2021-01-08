// get scenes
const scenes = document.querySelectorAll('.scene-section')

// create scenes (order matters)
const whatIsLTSScene = new ScrollMagic.Scene({
    duration: 100,
    triggerElement: scenes[0],
    reverse: true
})
.on('enter', e => {
    console.log('entered whatisLTS scene')
    // toggle animation here to reveal element 
})
const regionalLTSScene = new ScrollMagic.Scene({
    duration: 100,
    triggerElement: scenes[1],
    reverse: true
})
.on('enter', e => {
    console.log('entered regional LTS scene')
    // toggle animation here to reveal element 
})
.setPin('#scrollstory-map') // pins the map for the the scene's duration

export { whatIsLTSScene, regionalLTSScene }