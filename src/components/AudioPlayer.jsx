import { useState } from 'react'
import styles from '../styles/audioPlayer.module.css'
const AudioPlayer = ({ song }) => {
  const music = new Audio(song)
  const [duration, setDuration] = useState(0)
  const [playbackTime, setPlaybackTime] = useState('')
  const [playTarget, setPlayTarget] = useState(music)
  const [isMusicStoped, setMusicStoped] = useState(true)
  const [curPose, setCurpose] = useState(0)

  const timeConverted = (duration) => {
    let hours = 0
    let min = 0
    let sec = 0

    //Считаем часы
    duration / 3600 > 1 && duration / 3600 < 10
      ? (hours = `0${Math.floor(duration / 3600)}`)
      : (hours = '00')
    //Считаем минуты
    min = Math.floor(duration / 60)
    min < 10 ? (min = `0${min}`) : (min = `${min}`)
    //Считаем секунды
    sec = Math.floor(duration % 60)
    sec < 10 ? (sec = `0${sec}`) : (sec = `${sec}`)
    return `${hours}:${min}:${sec}`
  }

  music.onloadedmetadata = () => {
    setDuration(music.duration)
    setPlaybackTime(timeConverted(duration))
  }

  const letItPlay = () => {
    playTarget.play()
    setMusicStoped(false)
  }

  const letItPause = () => {
    playTarget.pause()
  }

  const letItStop = (e) => {
    playTarget.pause()
    playTarget.currentTime = 0
    e.target.parentNode.parentNode.querySelector(
      '.' + styles.audioplayer_playhead
    ).style.left = '-1%'
    e.target.parentNode.parentNode.querySelector(
      '.' + styles.audioplayer_playroad
    ).style.width = '0%'

    setMusicStoped(true)
  }

  const setPlayerTime = (e) => {
    let playRoadWidth = e.target.offsetWidth
    let playRoadStart = e.target.offsetLeft
    const playHead = e.target.querySelector('.' + styles.audioplayer_playhead)
    const backPlay = e.target.querySelector('.' + styles.audioplayer_playroad)
    const currentPosition = e.clientX - playRoadStart
    const musicPosition =
      (duration * ((currentPosition * 100) / playRoadWidth)) / 100

    if (!isMusicStoped) {
      playHead.style.left = `${currentPosition - playRoadWidth * 0.018}px`
      backPlay.style.width = `${currentPosition}px`
      playTarget.currentTime = musicPosition
    } else {
      playHead.style.left = `-1%`
      backPlay.style.width = `0%`
    }
  }

  music.ontimeupdate = (e) => {
    setPlayTarget(e.target)
    setCurpose(playTarget.currentTime)
  }

  return (
    <div className={styles.audioplayer_wrapper}>
      <h1>Здесь должен быть плеер</h1>

      <div
        className={
          isMusicStoped
            ? styles.aurdioplayer_duration_wrapper
            : styles.aurdioplayer_duration_wrapper +
              ' ' +
              styles.audioplayer_active
        }
      >
        <p>00:00:00</p>
        {duration !== 0 && <p>{timeConverted(curPose)}</p>}
        {duration !== 0 && <p>{playbackTime}</p>}
      </div>
      <div
        className={styles.audioplayer_playback}
        onClick={(e) => {
          setPlayerTime(e)
        }}
      >
        <div className={styles.audioplayer_playroad}></div>
        <div className={styles.audioplayer_playhead}></div>
      </div>
      <div className={styles.audioplayer_buttons_wrapper}>
        <span
          className={styles.audioplayer_buttons}
          onClick={() => {
            letItPlay()
          }}
        >
          PLAY
        </span>
        <span
          className={styles.audioplayer_buttons}
          onClick={() => {
            letItPause()
          }}
        >
          PAUSE
        </span>
        <span
          className={styles.audioplayer_buttons}
          onClick={(e) => {
            letItStop(e)
          }}
        >
          STOP
        </span>
      </div>
    </div>
  )
}

export default AudioPlayer
