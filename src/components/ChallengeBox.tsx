import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/ChallengeBox.module.css'

const ChallengeBox = (): JSX.Element => {
  const { activeChallenge, resetChallenge } = useContext(ChallengeContext)

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
                  onClick={resetChallenge}
                >
                  Falhei
                </button>
                <button
                  type="button"
                  className={styles.challengeSucceededButton}
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
