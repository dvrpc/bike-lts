import sceneObjs from './scenes.js'

// init controller & add scenes
const controller = new ScrollMagic.Controller();
sceneObjs.forEach(scene => scene.addTo(controller))