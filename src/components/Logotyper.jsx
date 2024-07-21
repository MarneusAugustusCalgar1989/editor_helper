import { useNavigate } from 'react-router-dom'
import Wrapper from './Wrapper'
import { useState } from 'react'

const Logotyper = () => {
  const navigate = useNavigate()
  const [imgLoaded, setImgLoaded] = useState('')
  const [imageName, setImageName] = useState('')

  const sendPhoto = async (e) => {
    e.preventDefault()
    setImageName('to_' + e.target.filename.files[0].name)
    const formData = new FormData()
    formData.append('file', e.target.filename.files[0])

    const response = await fetch('http://213.59.156.172:3000/add_logo_test', {
      method: 'POST',
      body: formData,
    })
    if (response.ok) {
      //Если мы что-то получили
      const reader = response.body.getReader()
      let chunks = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        chunks.push(value)
      }
      const blob = new Blob(chunks)
      const imgSrc = URL.createObjectURL(blob)
      console.log('All is ok')
      URL.revokeObjectURL(blob)

      setImgLoaded(imgSrc)
      await fetch('http://213.59.156.172:3000/cleaner_for_img', {
        method: 'POST',
      })
      return imgSrc
    } else {
      console.log(response.status, response.statusText) // Обрабатываем ошибки
      navigate('/')
    }
  }

  return (
    <div className="App">
      <Wrapper>
        <h1>Logotyper</h1>
        {imgLoaded && (
          <>
            <a
              href={imgLoaded}
              download={imageName}
              className="image_converter_result"
              target="blank"
            >
              <img src={imgLoaded} />
            </a>
            <button
              onClick={() => {
                setImgLoaded()
              }}
            >
              Попробовать еще раз
            </button>
          </>
        )}
        {!imgLoaded && (
          <form onSubmit={sendPhoto}>
            <input type="file" name="filename" />
            <button type="submit"> Отправить </button>
          </form>
        )}
      </Wrapper>
    </div>
  )
}

export default Logotyper
