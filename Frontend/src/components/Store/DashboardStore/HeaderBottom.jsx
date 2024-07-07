import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";

const HeaderBottom = () => {
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart); // Ambil state cart dari Redux store
  const cartTotalQuantity = cart.cartTotalQuantity; // Ambil cartTotalQuantity dari state cart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once on component mount

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = products.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleProductClick = (productId) => {
    setSearchQuery("");
    navigate(`/DashboardStore/product/${productId}`);
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <h1 className="font-bold">
            <Link to="/DashboardStore">Toko WKJ</Link>
          </h1>

          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Cari Produk Yang Anda Inginkan"
            />
            <FaSearch className="w-5 h-5" />

            {/* Search results */}
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery && filteredProducts.length === 0 && (
                  <p className="text-center mt-6">Produk Tidak Tersedia</p>
                )}

                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() => handleProductClick(item.id)} // Handle product click
                      key={item.id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 p-3"
                    >
                      <img
                        className="w-24 h-28"
                        src={item.img}
                        alt="productImg"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-xs">
                          {item.des && item.des.length > 100
                            ? `${item.des.slice(0, 100)}...`
                            : item.des}
                        </p>

                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            {item.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* User and Cart */}
          <div className=" z-10">
            {/* User dropdown */}

            {/* Cart */}

            <div className="relative cursor-pointer mt-4 md:mt-0 ">
              <Link to="/cart" className="flex items-center justify-center">
                <TiShoppingCart className="text-3xl opacity-80 " />
                {cartTotalQuantity > 0 && (
                  <div className="absolute h-4 w-4 rounded-full z-10 top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white flex items-center justify-center text-xs">
                    {cartTotalQuantity}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
