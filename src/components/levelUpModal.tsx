import React, { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/levelUpModal.module.css'

const LevelUpModal = (): JSX.Element => {
  const { level, closeLevelUpModal } = useContext(ChallengeContext)
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type='button' onClick={e => closeLevelUpModal()}>
          <img src="/icons/close.svg" alt="Fecher modal"/>
        </button>
      </div>
    </div>
  )
}

export default LevelUpModal
