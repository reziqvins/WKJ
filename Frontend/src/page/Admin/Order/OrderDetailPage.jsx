import React from 'react'
import OrderDetail from '../../../components/Admin/Order/OrderDetail'
import OrderInformation from '../../../components/Admin/Order/OrderInformation'
import TopBar from '../../../components/Admin/TopBar'

const OrderDetailPage = () => {
  return (
    <div className='px-4'>
      {/* <OrderDetail/> */}
      <TopBar title="Order"/>
      <OrderInformation/>
    </div>
  )
}

export default OrderDetailPage
