import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'
import Completedchallenges from '../components/Completedchallenges'
import Countdown from '../components/Countdown'

import styles from '../styles/pages/Home.module.css'

import Head from 'next/head'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar/>

      <section>
        <div>
          <Profile/>
          <Completedchallenges/>
          <Countdown/>
        </div>
        <div></div>
      </section>
    </div>
  )
}
