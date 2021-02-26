import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/ChallengeBox.module.css'

const ChallengeBox = (): JSX.Element => {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
  const { resetCountdown } = useContext(CountdownContext)

  const handleChallengeSucceeded = (): void => {
    completeChallenge()
    resetCountdown()
  }

  const handleChallengeFailed = (): void => {
    resetChallenge()
    resetCountdown()
  }
  return (
    <div className={styles.challengeBoxConatiner}>
      {
        activeChallenge
          ? (
            <div className={styles.challengeActive}>
              <header>Ganhe {activeChallenge.amount} xp</header>

              <main>
                <img src={`icons/${activeChallenge.type}.svg`} alt="" />
                <strong>Novo desafio</strong>
                <p>{activeChallenge.description}</p>
              </main>
              <footer>
                <button
                  type="button"
                  className={styles.challengeFailedButton}
                  onClick={e => handleChallengeFailed()}
                >
                  Falhei
                </button>
                <button
                  type="button"
                  className={styles.challengeSucceededButton}
                  onClick={e => handleChallengeSucceeded()}
                >
                  Completei
                  </button>
              </footer>

            </div>
            )
          : (
            <div className={styles.challengeNotActive}>
              <strong>Finalize um ciclo para receber um desafio</strong>
              <p>
                <img src="icons/level-up.svg" alt="Level up" />
                Avance de level completando desafios.
              </p>
            </div>
            )
        }
    </div >
  )
}

export default ChallengeBox
