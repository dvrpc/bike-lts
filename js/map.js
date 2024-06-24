mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNseHRkcXU4YzF3bnYybG9wMXAyN3R6ZWwifQ.kezQHP6Q07BTMlZvR6PxSw'

const customMap = container => {
    const defaultCenter = window.innerWidth < 750 ? [-75.12, 40.071] : [-74.75, 40.071]
    const center = container.center || defaultCenter

    const map = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/mapbox/dark-v10',
        attributionsControl: false,
        center: center,
        zoom: 8.4,
        interactive: false
    })

    return map
}

export default customMap