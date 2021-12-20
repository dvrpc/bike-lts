mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

const customMap = container => {
    const center = container.center || [-74.75, 40.071]

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