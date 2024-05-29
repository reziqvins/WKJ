import React from 'react'
import TopBar from '../../../components/Admin/TopBar'
import FormEditProd from '../../../components/Admin/Product/FormEditProd'

function EditProduct() {
  return (
    <div className='px-4'>
      <TopBar title="Edit Produk"/>
      <FormEditProd/>
    </div>
  )
}

export default EditProduct
