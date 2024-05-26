import React, { useState, useEffect } from 'react';
import { db } from "../../Firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

function GalleryTable() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGalleryItems(items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'gallery', id));
        setGalleryItems(galleryItems.filter(item => item.id !== id));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-end">
      <button className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-auto rounded-lg  md:mt-0 mb-5"><Link to="/AddGallery">Tambah Media</Link></button>

        </div>      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Media</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Title</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Description</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Type</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {galleryItems.map(item => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b border-gray-200">
                {item.mediaType === 'image' ? (
                  <img src={item.media} alt={item.title} className="h-16" />
                ) : (
                  <video controls className="h-16">
                    <source src={item.media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{item.title}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.desc}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.mediaType}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <Link to={`/editGallery/${item.id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                      <MdEdit />
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GalleryTable;
