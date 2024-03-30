import React from 'react';
import { heroImg } from '../../assets';
import  {AiOutlineSearch} from 'react-icons/ai'

const Hero = () => {
  return (
    <div className='w-full bg-white p-20'>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] md:px-0'>
            
            <div className='flex flex-col justify-start gap-4'>
                <p className='py-2 text-2xl text-[#20B486] font-medium'> Selamat Datang,</p>
                <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Hidup Lebih Sehat Bersama UPTD Kesehatan Jamu
                </h1>
                <p className='py-2 text-lg text-gray-600'>Menyatu dengan <span className='text-[#20B486]'>Alam</span>, Menghadirkan Kesembuhan dengan <span className='text-[#20B486]'>Tanaman Herbal</span>.</p>
                
                {/* <form className='bg-white border max-w-[500px] p-4 input-box-shadow rounded-md flex justify-between'>
                    <input 
                        className='bg-white'
                        type="text"
                        placeholder='What do want to learn?'
                    />
                    <button>
                        <AiOutlineSearch 
                            size={20}
                            className="icon"
                            style={{color:'#000'}}

                        />

                    </button>
                </form> */}
            </div>
            
            <img  src={heroImg} className="md:order-last  order-first" />



        </div>
        

    </div>
  )
}

export default Hero