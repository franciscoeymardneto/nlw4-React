import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar = (): JSX.Element => {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext)
  const percentToNextLevel = Math.round(currentExperience.valueOf() * 100) as any / experienceToNextLevel.valueOf()
  return (
    <header className={styles.experienceBar}>
      <span>0 px</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}></div>
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience}xp</span>
      </div>
      <span>{experienceToNextLevel}px</span>
    </header>
  )
}

export default ExperienceBar
