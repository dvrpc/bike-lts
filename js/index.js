import sceneObjs from './scenes.js'

// init controller
const controller = new ScrollMagic.Controller();

// add scenes to controller
sceneObjs.forEach(scene => scene.addTo(controller))