// Functions to POST feedback form
const submitFeedback = async e => {
    e.preventDefault()

    const form = e.target
    const data = new FormData(form)
    const options = postOptions(data)

    const stream = await fetch('www.api.jawn.edu.gov', options)

    // success: alert + reset sidebar to default view
    if(stream.ok) {
        alert('Feedback received, thank you!')

    // fail: alert + reset form to default state
    } else {
        alert ('post failed, try again')
    }
}

const postOptions = body => {
    return {
        method: 'POST',
        body: body
    }
}

export default submitFeedback