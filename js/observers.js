const observeNav = (entries, observer) => {
    entries.forEach(entry => {
        console.log('entry ', entry)
        // if(entry.intersectionRatio > 0) entry.target.classList.remove('top-nav-visible')
        // else entry.target.classList.add('top-nav-visible')
    })
    // console.log('entris are ', entries)
    // console.log('observer is ', observer)
}

export { observeNav }