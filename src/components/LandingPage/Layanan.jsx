import React from 'react'
import { achievement } from '../../assets'

const Layanan = () => {
  return (
    <div className='w-full bg-white px-20 '>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] md:px-0'>
            
            <div className='flex flex-col justify-center '>
                <h1 className='md:leading-[72px] text-3xl font-bold'>Layanan <span className='text-[#20B486]'>Kami</span></h1>
                <p className='text-lg text-gray-600'>kami memberikan pelayanan yang personal dan terfokus pada kebutuhan kesehatan Anda.</p>
                
                <div className='grid md:grid-cols-2 gap-4 py-16'>
                        <div className='px-3 bg-green-200 p-4 rounded-xl'>
                            <h1 className='text-2xl font-semibold'>Konsultasi</h1>
                            <p className='text-[#6D737A]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>

                    
                        <div className='px-3 bg-[#ffc17a7e] rounded-xl p-4'>
                            <h1 className='text-2xl font-semibold'>Akupuntur</h1>
                            <p className='text-[#6D737A]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>

                    
                        <div className='px-3 bg-[#ed445863] rounded-xl p-4'>
                            <h1 className='text-2xl font-semibold'>Cafe Jamu</h1>
                            <p className='text-[#6D737A]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>

                    
                        <div className='px-3 bg-[#0076fd6c] rounded-xl p-4'>
                            <h1 className='text-2xl font-semibold'>Produk Inovasi</h1>
                            <p className='text-[#6D737A]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>


                </div>
           </div>
            
             
             <img  src={achievement} className="m-auto md:order-last  order-first" />




        </div>
        

    </div>
  )
}

export default Layanan