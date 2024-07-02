import React from 'react'
import TopBar from '../../../components/Admin/TopBar'
import FormAddProd from '../../../components/Admin/Product/FormAddProd'

function AddProduct() {
  return (
    <div className='px-4'>
      <TopBar title="Tambah Produk"/>
      <FormAddProd/>
    </div>
  )
}

export default AddProduct
