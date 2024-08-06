import React from 'react'
import OrderInformation from '../../../components/Admin/Order/DetailOrder/OrderInformation'
import TopBar from '../../../components/Admin/TopBar'
import UserInformation from '../../../components/Admin/Order/DetailOrder/UserInformation'

const OrderDetailPage = () => {
  return (
    <div className='px-4'>
      <TopBar title="Order"/>
      <div>
      <OrderInformation/>
      </div>
    </div>
  )
}

export default OrderDetailPage
