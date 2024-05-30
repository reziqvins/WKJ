import React from 'react'
import TopBar from '../../../components/Admin/TopBar'
import OrderTable from '../../../components/Admin/Order/OrderTable'

const OrderPage = () => {
  return (
    <div className='px-4'>
      <TopBar title="Halaman Orders"/>
      <OrderTable/>
    </div>
  )
}

export default OrderPage
