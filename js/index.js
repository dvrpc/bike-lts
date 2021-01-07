// import "scenes"
import { whatIsLTSScene, regionalLTSScene } from './scenes.js'

// init controller
const controller = new ScrollMagic.Controller();

// add scenes to controller
whatIsLTSScene.addTo(controller)
regionalLTSScene.addTo(controller)