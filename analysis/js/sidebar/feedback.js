// Functions to render feedback form 
import submitFeedback from '..api'

// @NOTE: rather than replacing sidebar content with feedback form, superimpose form over sidebar content.
// this makes the transition back to main sidebar content easier and especially helps with maintaining state
const createFeedbackForm = () => {
    const form = document.createElement('form')

    // form fields and content TBD

    form.onsubmit = e => submitFeedback(e)

    return form
}

export default createFeedbackForm