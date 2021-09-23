import sceneObjs from './scenes.js'
import { observeNav } from './observers.js';

const topNav = document.getElementById('top-nav')

// init controller & add scenes
const controller = new ScrollMagic.Controller();
sceneObjs.forEach(scene => scene.addTo(controller))

// observe top nav
const options = {
    rootMargin: '0px',
    threshold: 0.1
}
const observer = new IntersectionObserver(observeNav, options)

observer.observe(document.getElementById('scroll-story-main'))