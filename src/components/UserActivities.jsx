import styles from '../styles/UserActivities.module.css'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ModalWindow from './ModalWindow'
import AudioPlayer from './AudioPlayer'

const UserActivities = ({ item, innerCB }) => {
  const context = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [imageLoaded, setImgLoaded] = useState('')
  const [audioLoaded, setAudioLoaded] = useState('')

  const getConvertedImage = async () => {
    setShowModal(true)
    const response = await fetch(
      'http://213.59.156.172:3000/converted_images/' + item.requestText,
      {
        method: 'GET',
        headers: { 'Content-Type': 'image/jpg' },
      }
    )

    if (response.ok) {
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

      URL.revokeObjectURL(blob)

      setImgLoaded(imgSrc)
    }
  }

  const getConvertedAudio = async () => {
    setShowModal(true)
    const response = await fetch(
      'http://213.59.156.172:3000/converted_sounds/' + item.requestText,
      {
        method: 'GET',
        headers: { 'Content-Type': 'image/jpg' },
      }
    )

    if (response.ok) {
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

      URL.revokeObjectURL(blob)

      setAudioLoaded(imgSrc)
    }
  }
  useEffect(() => {
    if (item.logotype_image) {
      getConvertedImage()
    }
    if (item.convert_audio) {
      getConvertedAudio()
      console.log(item.requestText)
    }
  }, [item])

  const createInnerHtml = (item) => {
    return { __html: item }
  }

  const removeActivity = async (e) => {
    context.index = item.requestText

    await fetch('http://213.59.156.172:3000/remove_activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context),
    })
      .then((data) => data.json())
      .then((data) => {
        innerCB(item.requestText)
        if (data[0][0].Default) {
          navigate('/')
        }
      })
  }

  const postDate = new Date(item.timeStamp)
  let month = ''

  if (postDate.getMonth() === 0) {
    month = 'Января'
  }
  if (postDate.getMonth() === 1) {
    month = 'Февраля'
  }
  if (postDate.getMonth() === 2) {
    month = 'Марта'
  }
  if (postDate.getMonth() === 3) {
    month = 'Апреля'
  }
  if (postDate.getMonth() === 4) {
    month = 'Мая'
  }
  if (postDate.getMonth() === 5) {
    month = 'Июня'
  }
  if (postDate.getMonth() === 6) {
    month = 'Июля'
  }
  if (postDate.getMonth() === 7) {
    month = 'Августа'
  }
  if (postDate.getMonth() === 8) {
    month = 'Сентября'
  }
  if (postDate.getMonth() === 9) {
    month = 'Октября'
  }
  if (postDate.getMonth() === 10) {
    month = 'Ноября'
  }
  if (postDate.getMonth() === 11) {
    month = 'Декабря'
  }

  let postTime = `${postDate.getDay()} ${month} ${postDate.getFullYear()}. ${
    postDate.getHours() > 9 ? postDate.getHours() : '0' + postDate.getHours()
  }:${
    postDate.getMinutes() > 9
      ? postDate.getMinutes()
      : '0' + postDate.getMinutes()
  }:${
    postDate.getSeconds() > 9
      ? postDate.getSeconds()
      : '0' + postDate.getSeconds()
  }`

  return (
    <div>
      {item.Default && <h1>Нечего показывать</h1>}

      {!item.Default && item.type && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
            <p>{postTime}</p>
            <span
              className={styles.remove_button}
              onClick={(e) => removeActivity(e)}
            >
              &times;
            </span>
          </div>

          <div className={styles.ua_header_wrapper}>
            <h1>{item.type}</h1>
          </div>

          <p>
            {item.adress} {item.sign ? 'С печатью' : 'С печатью и подписью'}{' '}
          </p>
          <div
            className={styles.request_container}
            dangerouslySetInnerHTML={createInnerHtml(item.requestText)}
          ></div>
          <div className={styles.button_wrapper}>
            <div
              className={styles.user_activities_button}
              onClick={() => {
                context.item = item
                navigate('/documentcreator')
              }}
            >
              <p>Повторить</p>
              <span className={styles.tec_span}>{item.timeStamp}</span>
            </div>
          </div>
        </div>
      )}

      {!item.Default && item.logotype_image && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
            <p>{postTime}</p>

            <span
              className={styles.remove_button}
              onClick={(e) => removeActivity(e)}
            >
              &times;
            </span>
          </div>
          <div className={styles.ua_header_wrapper}>
            <h1>Логотипер</h1>
          </div>

          <div className={styles.request_container}>
            {showModal ? (
              <ModalWindow progress={uploadProgress} />
            ) : (
              <a href={imageLoaded} download={item.requestText} target="blank">
                <img src={imageLoaded} alt={item.requestText} />
              </a>
            )}
          </div>
        </div>
      )}

      {!item.Default && item.convert_audio && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
            <p>{postTime}</p>

            <span
              className={styles.remove_button}
              onClick={(e) => removeActivity(e)}
            >
              &times;
            </span>
          </div>
          <div className={styles.ua_header_wrapper}>
            <h1>Аудиокнвертер</h1>
          </div>

          <div className={styles.request_container}>
            {showModal ? (
              <ModalWindow progress={uploadProgress} />
            ) : (
              <>
                <p>
                  {
                    item.requestText
                      ?.split(')_', 2)[1]
                      .split('_converted', 2)[0]
                  }
                </p>
                <AudioPlayer />
                <div className={styles.button_wrapper}>
                  <div className={styles.user_activities_button}>
                    <a
                      href={audioLoaded}
                      download={item.requestText}
                      target="blank"
                    >
                      <p>Скачать</p>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserActivities
