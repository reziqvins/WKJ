import React from 'react'
import TopBar from '../../../../components/Admin/TopBar'
import GalleryTable from '../../../../components/Admin/LandingPage/Galery/GalleryTable'

function GalleryPage() {
  return (
    <div className='px-4'>
      <TopBar title="Halaman Galery"/>
      <GalleryTable/>
    </div>
  )
}

export default GalleryPage
