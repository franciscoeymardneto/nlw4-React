import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallenges.module.css'
const CompletedChallenges = (): JSX.Element => {
  const { challengesCompleted } = useContext(ChallengeContext)
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}

export default CompletedChallenges
