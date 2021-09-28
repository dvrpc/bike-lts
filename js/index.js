import sceneObjs from './scenes.js'
import { calculateSideNavSticky } from './indexUtils.js';

const topNav = document.querySelector('.top-nav');
const sideNav = document.getElementById('scroll-story-nav')

// init controller & add scenes
const controller = new ScrollMagic.Controller();
sceneObjs.forEach(scene => scene.addTo(controller))

// set up top nav scroll observer
const callback = entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      topNav.classList.remove('top-nav-visible')
    } else {
      topNav.classList.add('top-nav-visible')
    }
  })
}
const observer = new IntersectionObserver(callback);
observer.observe(document.getElementById('story-intro'))

// calculate side-nav sticky & handle resize
sideNav.style.top = calculateSideNavSticky(sideNav, topNav)
window.onresize = () => {
  sideNav.style.top = calculateSideNavSticky(sideNav, topNav)
}