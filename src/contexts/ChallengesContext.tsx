import { createContext, ReactNode, useState } from 'react'

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
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const ChallengeContext = createContext({} as ChallengesContextData)

const ChallengeProvider = ({ children }: ChallengesProviderProps): JSX.Element => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(30)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  const levelUp = (): void => {
    setLevel(level + 1)
  }

  const startNewChallenge = (): void => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const selectedChallenge = challenges[randomChallengeIndex]
    setActiveChallenge(selectedChallenge as Challenge)
  }

  const resetChallenge = (): void => {
    setActiveChallenge(null)
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
        levelUp
      }
      }
    >
      {children}
    </ChallengeContext.Provider>
  )
}

export default ChallengeProvider
