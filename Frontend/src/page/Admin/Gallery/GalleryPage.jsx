import React from 'react'
import GalleryTable from '../../../components/Galery/GalleryTable'
import TopBar from '../../../components/Admin/TopBar'

function GalleryPage() {
  return (
    <div className='px-4'>
      <TopBar title="Halaman Galery"/>
      <GalleryTable/>
    </div>
  )
}

export default GalleryPage