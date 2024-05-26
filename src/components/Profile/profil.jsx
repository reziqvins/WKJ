import React from 'react'

function Profil() {
  return (
    <div className='p-4'>
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen rounded-lg">
      <div className="w-full md:w-1/3 bg-green-400 p-6 flex flex-col items-center shadow-md rounded-l-lg">
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12h.01M12 15h.01M9 12h.01M12 9h.01M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="mt-4 text-xl font-semibold">Nathaniel Poole</h2>
        <p className="mt-1 text-gray-600">Member</p>
        <div className="mt-6 flex text-left w-full">
          <div className="kiri w-[30%]">
            <p>email</p>
            <p>No Hp</p>
            <p>Alamat</p>
          </div>
          <div className="kanan">
            <p> : Nreziq@gmail.com</p>
            <p>: 08965675324876 </p>
            <p>: Perum. Tonggara rt </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-6 bg-white shadow-md">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value="Nathaniel"
              />
            </div>
            <div>
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value="Poole"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value="+1800.000"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email Address</label>
              <input
                type="email"
                className="w-full border rounded-lg p-2"
                value="nathaniel.poole@microsoft.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value="Bridgeport"
              />
            </div>
            <div>
              <label className="block text-gray-600">State/County</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value="WA"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Postcode</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value="31005"
              />
            </div>
            <div>
              <label className="block text-gray-600">Country</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value="United States"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Profil