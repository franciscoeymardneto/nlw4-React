import { useContext, useEffect, useState } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Countdown.module.css'

const Countdown = (): JSX.Element => {
  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const { startNewChallenge } = useContext(ChallengeContext)

  let countdownTimeout: NodeJS.Timeout

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRigh] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRigh] = String(seconds).padStart(2, '0').split('')

  const startCountdown = (): void => {
    setIsActive(true)
  }

  const resetCountdown = (): void => {
    setIsActive(false)
    clearTimeout(countdownTimeout)
    setTime(0.1 * 60)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      startNewChallenge()
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time])

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
      { hasFinished
        ? (
            <button
                disabled
                className={styles.countdownButton}
              >
                Ciclo encerrado
                {/* <span>
                  <img src="icons/" alt=""/>
                </span> */}
            </button>
          )
        : (
            <>
              { !isActive
                ? (
                    <button
                      type="button"
                      className={styles.countdownButton}
                      onClick={e => startCountdown()}
                    >
                      iniciar um ciclo
                    </button>
                  )
                : (
                    <button
                      type="button"
                      className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                      onClick={e => resetCountdown()}
                    >
                      Abondonar ciclo X
                    </button>
                  )
              }
            </>
          )
      }

    </div>
  )
}

export default Countdown
