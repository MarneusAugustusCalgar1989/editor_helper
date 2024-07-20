import { Form, redirect, useSubmit } from 'react-router-dom'
import Wrapper from './Wrapper'

const Logotyper = () => {
  let submit = useSubmit()

  return (
    <div className="App">
      <Wrapper>
        <h1>Logotyper</h1>
        <Form
          method="post"
          onSubmit={(e) => {
            submit(e.currentTarget)
          }}
        >
          <input type="file" name="testText" />
          <button type="submit">Отправить</button>
        </Form>
      </Wrapper>
    </div>
  )
}

export const testAction = async ({ params, request }) => {
  let form = request.formData()
  const data = await form
  console.log(data.get('testText'))
  return null
}

export default Logotyper
