import { useNavigate } from 'react-router-dom'
import Wrapper from '../components/Wrapper'
import { useEffect, useState } from 'react'
import ModalWindow from '../components/ModalWindow'
import AnimatedPage from '../components/AnimatedPage'
import { useAuth } from '../hooks/useAuth'
import testFetch from '../components/hoc/testFetch'
import envirConfig from '../components/envir_config/envirConfig'

const Logotyper = () => {
  const navigate = useNavigate()
  const [imgLoaded, setImgLoaded] = useState('')
  const [imageName, setImageName] = useState('')
  const [uploadProgress, setUploadProgress] = useState()
  const [showModal, setShowModal] = useState(false)
  // const [inputHandle, setInputHandle] = useState('no-input')
  const context = useAuth()
  useEffect(() => {
    testFetch(context.setServiceON, context)
  }, [context.user, context.serviceON, context])
  const sendPhoto = async (e) => {
    e.preventDefault()

    setShowModal(true)
    setImgLoaded('Started')

    setImageName('to_' + e.target.files[0].name)

    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('text', context.user)
    formData.append('username', context.username)
    formData.append('timeStamp', new Date())

    const response = await fetch(envirConfig.serverURL + '/add_logo_test', {
      method: 'POST',
      body: formData,
    })
    if (response.ok) {
      //Если мы что-то получили
      const reader = response.body.getReader()
      const contentLength = +response.headers.get('Content-Length')
      let recievedLength = 0
      let chunks = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        chunks.push(value)
        recievedLength += value.length
        setUploadProgress(
          `${Math.floor((recievedLength * 100) / contentLength)}%`
        )
      }
      const blob = new Blob(chunks)
      const imgSrc = URL.createObjectURL(blob)
      setShowModal(false)
      setUploadProgress(0)
      console.log('All is ok')
      URL.revokeObjectURL(blob)

      setImgLoaded(imgSrc)
      //Remove image from server
      await fetch(envirConfig.serverURL + '/cleaner_for_unconverted', {
        method: 'POST',
        body: context.user,
      })
      return imgSrc
    } else {
      console.log(response.status, response.statusText) // Обрабатываем ошибки
      navigate('/')
    }
  }

  return (
    <div className="App ">
      <Wrapper>
        <AnimatedPage>
          <h1 className="module_header">ЛОГОТИПЕР</h1>
          {showModal && <ModalWindow progress={uploadProgress} />}
          {imgLoaded && !showModal && (
            <>
              <a
                href={imgLoaded}
                download={imageName}
                className="image_converter_result"
                target="blank"
              >
                <img src={imgLoaded} alt="" title="Нажми, чтобы скачать" />
              </a>
              <div
                className="test_button"
                onClick={() => {
                  setImgLoaded()
                }}
              >
                Попробовать еще раз
              </div>
            </>
          )}
          {!imgLoaded && (
            <>
              <div
                className="image_loader_wrapper"
                onClick={() => {
                  const input = document.querySelector('form').filename
                  input.click()

                  // setInputHandle('input')
                }}
              >
                <h1>Загрузите изображение</h1>
              </div>

              <form style={{ display: 'none' }}>
                <input type="file" name="filename" onChange={sendPhoto} />
                <button type="submit"> Отправить </button>
              </form>
            </>
          )}
        </AnimatedPage>
      </Wrapper>
    </div>
  )
}

export default Logotyper
