import sceneObjs from './scenes.js'
import { observeNav } from './observers.js';

// init controller & add scenes
const controller = new ScrollMagic.Controller();
sceneObjs.forEach(scene => scene.addTo(controller))

const intro = document.getElementById('story-intro')

const topNav = document.querySelector('.top-nav');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
        topNav.classList.remove('top-nav-visible')
    } else {
        topNav.classList.add('top-nav-visible')
    }
  });
});

observer.observe(intro)