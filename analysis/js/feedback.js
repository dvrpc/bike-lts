// Functions to render feedback form 
import submitFeedback from './api.js'

const createFeedbackForm = () => {
    const form = document.createElement('form')

    // form fields and content TBD

    form.onsubmit = e => submitFeedback(e)

    return form
}

export default createFeedbackForm