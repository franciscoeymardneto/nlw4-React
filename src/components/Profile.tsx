import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

const Profile = (): JSX.Element => {
  const { level } = useContext(ChallengeContext)
  return (
    <div className={styles.profileContainer}>
      <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--D6vtkVyE--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/268788/c732e996-e1ff-4572-ba94-e4a7a7605346.png" alt="eymard neto"/>
      <div>
        <strong>Eymard Neto</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile
