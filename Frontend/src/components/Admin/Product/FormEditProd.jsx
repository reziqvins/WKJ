import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { storage, db } from "../../../Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

function FormEditProd() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [categ, setCateg] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); 
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          const data = productDoc.data();
          setProduct(data);
          setName(data.name);
          setPrice(data.price);
          setDesc(data.desc);
          setCateg(data.categ);
          setImg(data.img);
          setStock(data.stock);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    getProduct();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);

    // Buat pratinjau gambar
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      let imgUrl = product.img;
      if (img) {
        const storageRef = ref(storage, `product-images/${img.name}`);
        const uploadTask = uploadBytesResumable(storageRef, img);

        await uploadTask.on(
          "state_changed",
          null,
          (error) => {
            setError(error.message);
          },
          async () => {
            imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
          }
        );
      }

      await updateDoc(doc(db, "products", id), {
        name,
        price: Number(price),
        desc,
        categ,
        img: imgUrl,
        stock,
      });

      // Tampilkan SweetAlert success setelah produk berhasil diperbarui
      Swal.fire({
        icon: "success",
        title: "Produk Berhasil Di Update!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl mb-4 font-semibold">Edit Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <div className="mb-4">
          <label
            htmlFor="product-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-price"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Price
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-desc"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Description
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
            requiredx
            onChange={(e) => setCateg(e.target.value)}
            value={categ}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Pilih Kategori</option>
            <option value="Produk Inovasi">Produk Inovasi</option>
            <option value="Produk Konsultasi">Produk Konsultasi</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-img"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            
            onChange={handleFileChange}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
          {imgPreview && (
            <img
              src={imgPreview}
              alt="Product Preview"
              className="mt-2 max-w-xs"
            />
          )}{" "}
          {/* Tampilkan pratinjau gambar */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-stock"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Stock
          </label>
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
        >
          Update Product
        </button>
      </form>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

export default FormEditProd;
