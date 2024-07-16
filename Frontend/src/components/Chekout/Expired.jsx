import React from 'react';

const TransactionExpired = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Transaksi Kadaluarsa</h1>
      <p className="mt-4">Maaf, transaksi Anda telah kadaluarsa. Silakan coba lagi.</p>
      <a href="/consultation" className="text-blue-500">Kembali ke Halaman Konsultasi</a>
    </div>
  );
};

export default TransactionExpired;
