import { tabsContent } from './tabsConfigs.js'

const handleTabs = (tab, map) => {
    if(tab.classList.contains('sidebar-tab-active')) return false

    const tabID = tab.id
    const togglesContainer = tab.parentElement.nextElementSibling
    const currentActive = tab.previousElementSibling || tab.nextElementSibling

    currentActive.classList.remove('sidebar-tab-active')
    currentActive.classList.add('sidebar-tab-inactive')
    
    tab.classList.remove('sidebar-tab-inactive')
    tab.classList.add('sidebar-tab-active')

    // use tabID to update togglesContainer content
    while(togglesContainer.firstChild) togglesContainer.removeChild(togglesContainer.firstChild)
    
    const contentFnc = tabsContent[tabID]
    const contentFrag = contentFnc(map)

    togglesContainer.appendChild(contentFrag)

    // return tabID to update map layers
    return tabID
}

export default handleTabs