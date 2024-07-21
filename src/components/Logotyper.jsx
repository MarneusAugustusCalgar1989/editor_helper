import { Form, redirect, useSubmit } from 'react-router-dom'
import Wrapper from './Wrapper'

const Logotyper = () => {
  let submit = useSubmit()

  const sendData = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', e.target.filename.files[0])
    let response = await fetch('http://213.59.156.172:3000/add_logo_test', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <div className="App">
      <Wrapper>
        <h1>Logotyper</h1>
        <form onSubmit={sendData}>
          <input type="file" name="filename" />
          <button type="submit"> Отправить </button>
        </form>
      </Wrapper>
    </div>
  )
}

export default Logotyper
