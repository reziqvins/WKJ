import React from 'react'
import TopBar from '../../../components/Admin/TopBar'
import OrderTable from '../../../components/Admin/Order/OrderTable'

const OrderPage = () => {
  return (
    <div>
      <TopBar title="Halaman Orders"/>
      <OrderTable/>
    </div>
  )
}

export default OrderPage
