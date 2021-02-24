import { useEffect, useState } from 'react'
import styles from '../styles/components/Countdown.module.css'
const Countdown = (): JSX.Element => {
  const [time, setTime] = useState(25 * 60)
  const [active, setActive] = useState(false)

  const minutes = Math.floor(time) / 60
  const seconds = time % 60

  const [minuteLeft, minuteRigh] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRigh] = String(seconds).padStart(2, '0').split('')

  const startCountdown = (): any => {
    setActive(true)
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
  }, [active, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
      <div>
        <span>{minuteLeft}</span>
        <span>{minuteRigh}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondLeft}</span>
        <span>{secondRigh}</span>
      </div>
      </div>
      <button
        type="button"
        className={styles.countdownButton}
        onClick={e => startCountdown()}
      >
        iniciar um ciclo
      </button>
    </div>
  )
}

export default Countdown
