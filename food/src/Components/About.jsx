import React, { useContext } from 'react'
import UserContext from '../Utils/UserContext'

const About = () => {
 const {loggedInUser}=useContext(UserContext)

  return (
    <div>
    <h1>hello i'm about</h1>
    <h2>LoggedInUser : {loggedInUser}</h2>
    </div>
  )
}

export default About