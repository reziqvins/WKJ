import React from 'react'
import FormEditUser from '../../../components/Admin/User/FormEditUser'
import TopBar from '../../../components/Admin/TopBar'

function EditUserPage() {
  return (
    <div className='p-4'>
        <TopBar title="Edit User"/>
      <FormEditUser/>
    </div>
  )
}

export default EditUserPage
