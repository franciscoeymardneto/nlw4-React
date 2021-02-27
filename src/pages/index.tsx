import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'

import Countdown from '../components/Countdown'
import ChallengeBox from '../components/ChallengeBox'

import { GetServerSideProps } from 'next'
import styles from '../styles/pages/Home.module.css'

import Head from 'next/head'
import CountdownProvider from '../contexts/CountdownContext'
import ChallengeProvider from '../contexts/ChallengesContext'
import CompletedChallenges from '../components/CompletedChallenges'

interface HomeProps {
  level: Number
  currentExperience: Number
  challengesCompleted: Number
}

export default function Home (props: HomeProps): JSX.Element {
  return (
    <div className={styles.container}>
      <ChallengeProvider {...props}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar/>
        <CountdownProvider>
          <section>
              <div>
                <Profile/>
                <CompletedChallenges/>
                <Countdown/>
              </div>
              <div>
                <ChallengeBox/>
              </div>
            </section>
        </CountdownProvider>
      </ChallengeProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
