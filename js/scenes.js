// get scenes
const scenes = document.querySelectorAll('.scene-section')

// create scenes (order matters)
const whatIsLTSScene = new ScrollMagic.Scene({
    duration: 100,
    triggerElement: scenes[0],
    reverse: true
})
const regionalLTSScene = new ScrollMagic.Scene({
    duration: 100,
    triggerElement: scenes[1],
    reverse: true
}).setPin('#scrollstory-map') // pins the map for the the scene's duration

export { whatIsLTSScene, regionalLTSScene }