import sceneObjs from './scenes.js'

const topNav = document.querySelector('.top-nav');

// init controller & add scenes
const controller = new ScrollMagic.Controller();
sceneObjs.forEach(scene => scene.addTo(controller))

// @TODO: proper way to do this w/entry.target instead of topNav variable
  // target of intro and root of top-nav doesn't work that way I'd expect..
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