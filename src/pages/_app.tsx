import type { AppProps } from 'next/app'
import '../styles/globals.css'

import ChallengeProvider from '../contexts/ChallengesContext'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChallengeProvider>
      <Component {...pageProps} />
    </ChallengeProvider>
  )
}

export default MyApp
