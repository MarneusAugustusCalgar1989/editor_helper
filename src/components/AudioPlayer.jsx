import { useState } from 'react'
import styles from '../styles/audioPlayer.module.css'
const AudioPlayer = ({ song }) => {
  const music = new Audio(song)
  const [duration, setDuration] = useState(0)
  const [playbackTime, setPlaybackTime] = useState('')
  const [musicTime, setMusicTime] = useState(0)
  const [playTarget, setPlayTarget] = useState(music)

  const [played, setPlayed] = useState(false)

  music.onloadedmetadata = () => {
    setDuration(music.duration)

    let sec = duration % 60
    let hours = Math.floor(duration / 60 / 60)
    let min = Math.floor(duration / 60) - hours * 60
    setPlaybackTime(`${hours}:${min}:${Math.floor(sec / 60)}`)
  }

  music.ontimeupdate = (e) => {
    setMusicTime(music.currentTime)
    setPlayTarget(e.target)
  }

  return (
    <div className={styles.audioplayer_wrapper}>
      <h1>Здесь должен быть плеер</h1>

      <div className={styles.aurdioplayer_duration_wrapper}>
        <p>00:00</p>
        {duration !== 0 && <p>{Math.floor(musicTime)}</p>}
        {duration !== 0 && <p>{playbackTime}</p>}
      </div>
      <div className={styles.audioplayer_playback}>
        <div className={styles.audioplayer_playroad}></div>
        <div className={styles.audioplayer_playhead}></div>
      </div>
      <div className={styles.audioplayer_buttons_wrapper}>
        <span
          className={styles.audioplayer_buttons}
          onClick={() => {
            music.play()
            setPlayed(true)
          }}
        >
          PLAY
        </span>
        <span
          className={styles.audioplayer_buttons}
          onClick={() => {
            console.log('paused')
            playTarget.pause()
            setPlayed(false)
          }}
        >
          PAUSE
        </span>
      </div>
    </div>
  )
}

export default AudioPlayer
