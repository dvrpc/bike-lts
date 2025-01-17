import sceneObjs from './scenes.js'
import { calculateSideNavSticky } from './indexUtils.js';

const topNav = document.getElementById('top-nav');
const sideNav = document.getElementById('scroll-story-nav')
const firstScene = document.getElementById('what-is-LTS-scene')
const toFirstScene = document.querySelectorAll('.to-first-scene')

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

// calculate side-nav sticky & handle resize & handle first lts scen
sideNav.style.top = calculateSideNavSticky(sideNav, topNav)
firstScene.style.marginTop = `-${sideNav.offsetHeight}px`

window.onresize = () => {
  sideNav.style.top = calculateSideNavSticky(sideNav, topNav)
  firstScene.style.marginTop = `-${sideNav.offsetHeight}px`
}

// compensate for first scene padding on zoom to
toFirstScene.forEach(toFirst => {

  toFirst.onclick = e => {
    e.preventDefault()
    window.location.hash = 'what-is-LTS-scene'
    
    // account for 20vh padding
    const vh = window.innerHeight * .2

    window.scrollTo({
      top: firstScene.offsetHeight - vh,
      scrollBehavior: 'smooth'
    })
  }
})

document.getElementById('modal-close-button').addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById("modal-background").classList.toggle("hidden");
  document.getElementById("modal").classList.toggle("hidden");
})
