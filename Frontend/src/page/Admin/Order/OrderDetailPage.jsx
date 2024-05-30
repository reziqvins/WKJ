import React from 'react'
import OrderInformation from '../../../components/Admin/Order/OrderInformation'
import TopBar from '../../../components/Admin/TopBar'

const OrderDetailPage = () => {
  return (
    <div className='px-4'>
      <TopBar title="Order"/>
      <OrderInformation/>
    </div>
  )
}

export default OrderDetailPage
