import React, { useState, useEffect } from "react";
import { storage, db } from "../../../Firebase"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

function FormAddProd() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); 
  const [productCateg, setProductCateg] = useState("");
  const [productStock, setProductStock] = useState("");
  const [isCheck, setIsCheck] = useState(0);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
   
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "etalase"));
        const categoryData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImg(file);

    // Buat pratinjau gambar
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    console.log(productName, productPrice, productDesc, productImg);
    if (!productImg) {
      setError("Please select a valid image file");
      return;
    }

    const storageRef = ref(storage, `product-images/${productImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, productImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          await addDoc(collection(db, "products"), {
            name: productName,
            price: Number(productPrice),
            desc: productDesc,
            img: url,
            categ: productCateg,
            stock: productStock,
            isCheck: isCheck,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          setProductName("");
          setProductPrice(0);
          setProductDesc("");
          setProductImg(null);
          setProductCateg("");
          setProductStock("");
          setIsCheck(0);
          setError("");
          document.getElementById("file").value = "";

          Swal.fire({
            icon: "success",
            title: "Produk Berhasil ditambahkan!",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          setError(error.message);
        }
      }
    );
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <form onSubmit={addProduct}>
        <div className="mb-4">
          <label
            htmlFor="product-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Nama Produk
          </label>
          <input
            type="text"
            required
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-price"
            className="block text-gray-700 font-bold mb-2"
          >
            Harga Produk
          </label>
          <input
            type="number"
            required
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-desc"
            className="block text-gray-700 font-bold mb-2"
          >
            Deskripsi Produk
          </label>
          <input
            type="text"
            required
            onChange={(e) => setProductDesc(e.target.value)}
            value={productDesc}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-categ"
            className="block text-gray-700 font-bold mb-2"
          >
            Kategori Produk
          </label>
          <select
            id="product-categ"
            required
            onChange={(e) => setProductCateg(e.target.value)}
            value={productCateg}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Pilih Kategori</option>
            {categories.map(category => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-stock"
            className="block text-gray-700 font-bold mb-2"
          >
            Stok Produk
          </label>
          <input
            type="text"
            required
            onChange={(e) => setProductStock(e.target.value)}
            value={productStock}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-ischeck"
            className="block text-gray-700 font-bold mb-2"
          >
            isCheck?
          </label>
          <select
            id="product-ischeck"
            required
            onChange={(e) => setIsCheck(e.target.value)}
            value={isCheck}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Pilih Kategori</option>
            <option value="1">Ya</option>
            <option value="0">Tidak</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
          {error && <span style={{ color: "red" }}>{error}</span>}
          {imgPreview && (
            <img
              src={imgPreview}
              alt="Product Preview"
              className="mt-2 max-w-xs"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default FormAddProd;
