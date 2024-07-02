import React from "react";
import { FaBoxOpen } from "react-icons/fa";

const CheckOutSucces = () => {
  return (
    <div className="min-h-screen flex-col p-10">
      <div className=" w-[80%] items-center justify-center p-12">
        <h1>yeayyy, Order Berhasil</h1>
        <FaBoxOpen />
        <h1>haloo, andre</h1>
        <p>
          terima kasih, telah melakukan pemesanan kepada kami, berikut adalah
          detail pesanan Anda. jika Anda memiliki pertanyaan, jangan ragu untuk
          menghubungi kami, di konsultasi
        </p>
        <div className="flex justify-between">
          <div className="kiri flex">
            <div className="kiri">
              <p>Order ID </p>
              <p>Order Date </p>
            </div>
            <div className="kanan">
              <p>: #4452384904</p>
              <p>: #4452384904</p>
            </div>
          </div>
          <div className="kanan">
            Alamat : Perumahan Tonggara Rt 07 rw 03 kecamatan kedungbanteng
            kab.tegal
          </div>
        </div>
        <div className="items grid grid-cols-4 gap-2">
          <div className="header">
            <div className="">
              <p>Nama Produk</p>
            </div>
            <div className="">
              <p>Harga</p>
            </div>
            <div className="">
              <p>Jumlah</p>
            </div>
            <div className="">
              <p>Total</p>
            </div>
          </div>
        </div>
        <div className="items grid grid-cols-4 gap-2">
          <div className="header">
            <div className="">
              <p>Produk Konsultasi</p>
            </div>
            <div className="">
              <p>Rp. 25000</p>
            </div>
            <div className="">
              <p>1</p>
            </div>
            <div className="">
              <p>Rp. 25000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutSucces;
