import { createContext, ReactNode, useEffect, useState } from 'react'

import challenges from '../../challenges.json'

interface ChallengesProviderProps {
  children: ReactNode
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
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const ChallengeContext = createContext({} as ChallengesContextData)

const ChallengeProvider = ({ children }: ChallengesProviderProps): JSX.Element => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Notification.requestPermission()
  }, [])

  const levelUp = (): void => {
    setLevel(level + 1)
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

  const completeChallenge = (): void => {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount.valueOf()

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
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
        completeChallenge
      }
      }
    >
      {children}
    </ChallengeContext.Provider>
  )
}

export default ChallengeProvider
