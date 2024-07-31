import React, { useState } from 'react';

const FloatingButton = () => {
  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible(!isChatVisible);
  };

  return (
    <div className="relative">
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={toggleChat}
      >
        <span className="text-xl">💬</span>
      </button>
      {isChatVisible && (
        <div className="fixed bottom-20 right-5 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center p-3 bg-blue-500 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <button
              className="text-xl font-bold focus:outline-none"
              onClick={toggleChat}
            >
              ×
            </button>
          </div>
          <div className="p-3">
            {/* Di sini Anda bisa menambahkan komponen chat Anda */}
            <p>Selamat datang di layanan pelanggan kami!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
