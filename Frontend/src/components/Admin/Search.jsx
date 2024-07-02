import React, { useState } from 'react';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Handle perubahan input pencarian
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle pencarian
    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="flex  mb-4">
            <input
                type="text"
                className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button
                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}

export default Search;
