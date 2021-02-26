
import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

const Countdown = (): JSX.Element => {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRigh] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRigh] = String(seconds).padStart(2, '0').split('')

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
