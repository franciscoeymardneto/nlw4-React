import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengeContext } from './ChallengesContext'

interface CountdownContextData {
  minutes: Number
  seconds: Number
  hasFinished: Boolean
  isActive: Boolean
  startCountdown: Function
  resetCountdown: Function
}

interface CountdownProviderProps {
  children: ReactNode
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const CountdownContext = createContext({} as CountdownContextData)

const CountdownProvider = ({ children }: CountdownProviderProps): JSX.Element => {
  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const { startNewChallenge } = useContext(ChallengeContext)

  let countdownTimeout: NodeJS.Timeout

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const startCountdown = (): void => {
    setIsActive(true)
  }

  const resetCountdown = (): void => {
    setIsActive(false)
    clearTimeout(countdownTimeout)
    setTime(0.1 * 60)
    setHasFinished(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      startNewChallenge()
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time])
  return (
    <CountdownContext.Provider
    value={
      {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
      }
      }
    >
      {children}
    </CountdownContext.Provider>
  )
}

export default CountdownProvider
