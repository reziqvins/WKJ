import React from 'react'
import UserProfilePage from './UserProfilePage'
import Profil from '../components/Profile/profil'
import TopBar from '../components/Admin/TopBar'

function SettingPage() {
  return (
    <div>
        <TopBar title="Setting"/>
      <Profil/>
    </div>
  )
}

export default SettingPage
