import React from 'react';
import Layanan2 from '../../../../components/LandingPage/Layanan2';
import TopBar from '../../../../components/Admin/TopBar';
import FormLayanan2 from '../../../../components/Admin/LandingPage/Layanan2/FormLayanan2';

const Layanan2Page = () => {
  return (
    <div className='px-4'>
      <TopBar title="Halaman Layanan" />
      <div className="flex justify-center items-center">
        <Layanan2 />
      </div>
      <FormLayanan2 />
    </div>
  );
};

export default Layanan2Page;
