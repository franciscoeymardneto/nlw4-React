import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar = (): JSX.Element => {
  return (
    <header className={styles.experienceBar}>
      <span>0 px</span>
      <div>
        <div style={{ width: '50%' }}></div>
        <span className={styles.currentExperience} style={{ left: '50%' }}>300xp</span>
      </div>
      <span>670 px</span>
    </header>
  )
}

export default ExperienceBar
