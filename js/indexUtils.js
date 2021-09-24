const calculateSideNavSticky = (sideNav, topNav) => {
    const sideNavHeight = sideNav.offsetHeight
    const windowHeightAdjusted = window.innerHeight + topNav.offsetHeight
    
    return `${(windowHeightAdjusted - sideNavHeight) / 2}px`

}

export { calculateSideNavSticky }