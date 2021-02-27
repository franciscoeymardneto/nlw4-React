import { createContext, ReactNode, useEffect, useState } from 'react'

import challenges from '../../challenges.json'

import Cookies from 'js-cookie'
import LevelUpModal from '../components/levelUpModal'

interface ChallengesProviderProps {
  children: ReactNode
  level: Number
  currentExperience: Number
  challengesCompleted: Number
}

interface Challenge {
  type: 'body' | 'eye'
  description: String
  amount: Number
}

interface ChallengesContextData {
  level: Number
  currentExperience: Number
  challengesCompleted: Number
  activeChallenge: Challenge | null
  experienceToNextLevel: Number
  startNewChallenge: Function
  levelUp: Function
  resetChallenge: Function
  completeChallenge: Function
  closeLevelUpModal: Function
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const ChallengeContext = createContext({} as ChallengesContextData)

const ChallengeProvider = ({ children, ...rest }: ChallengesProviderProps): JSX.Element => {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((level.valueOf() + 1) * 4, 2)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  const levelUp = (): void => {
    setLevel(level.valueOf() + 1)
    setIsLevelUpModalOpen(true)
  }

  const startNewChallenge = (): void => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const selectedChallenge = challenges[randomChallengeIndex]
    setActiveChallenge(selectedChallenge as Challenge)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${selectedChallenge.amount.valueOf()}xp`
      })
    }
  }

  const resetChallenge = (): void => {
    setActiveChallenge(null)
  }

  const closeLevelUpModal = (): void => {
    setIsLevelUpModalOpen(false)
  }

  const completeChallenge = (): void => {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience.valueOf() + amount.valueOf()

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted.valueOf() + 1)
  }
  return (
    <ChallengeContext.Provider
    value={
      {
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        startNewChallenge,
        resetChallenge,
        levelUp,
        completeChallenge,
        closeLevelUpModal
      }
      }
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal/>}

    </ChallengeContext.Provider>
  )
}

export default ChallengeProvider
