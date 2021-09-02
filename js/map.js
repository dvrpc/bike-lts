mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'

const customMap = container => {
    const center = container.center || [-75.2273, 40.071]
    const bounds = container.bounds || [[-76.09405517578125, 39.49211914385648],[-74.32525634765625,40.614734298694216]]

    const map = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/mapbox/dark-v10',
        attributionsControl: false,
        center: center,
        bounds: bounds,
        interactive: false
    })

    return map
}

export default customMap