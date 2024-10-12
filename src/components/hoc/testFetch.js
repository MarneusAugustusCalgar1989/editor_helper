import envirConfig from '../envir_config/envirConfig'

const testFetch = async (setContext, context) => {
  try {
    await fetch(envirConfig.serverURL, {
      method: 'POST',
      body: context?.user || 'default-token',
    }).then((data) => {
      if (data) {
        setContext(true)
      } else {
        setContext(false)
      }
    })
  } catch (e) {
    console.log(e.text)
  } finally {
    console.log('Fetched')
  }
}

export default testFetch
