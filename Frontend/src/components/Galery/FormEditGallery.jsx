import React, { useState, useEffect } from 'react';
import { db, storage, ref } from '../../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function FormEditGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [newMedia, setNewMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const docRef = doc(db, 'gallery', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDesc(data.desc);
          setMedia(data.media);
          setMediaType(data.mediaType);
          setLoading(false);
        } else {
          console.log('No such document!');
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGalleryItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    let mediaUrl = media;

    if (newMedia) {
      const storageRef = ref(storage, `gallery/${newMedia.name}`);
      const uploadTask = uploadBytesResumable(storageRef, newMedia);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            setError(error.message);
            setLoading(false);
            reject(error);
          },
          async () => {
            mediaUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    try {
      const docRef = doc(db, 'gallery', id);
      await updateDoc(docRef, {
        title,
        desc,
        media: mediaUrl,
        mediaType,
        updatedAt: new Date(),
      });

      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Gallery item updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/gallery');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleMediaChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ['image/png', 'image/jpeg', 'video/mp4'].includes(selectedFile.type)) {
      setNewMedia(selectedFile);
      setMediaType(selectedFile.type.startsWith('image') ? 'image' : 'video');
      setError('');
    } else {
      setNewMedia(null);
      setError('File must be in jpg/png/mp4 format');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl mb-4 font-semibold">Edit Gallery Item</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700 font-bold mb-2">Description</label>
          <input
            type="text"
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="media" className="block text-gray-700 font-bold mb-2">Media</label>
          <input
            type="file"
            onChange={handleMediaChange}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
          Update
        </button>
      </form>
    </div>
  );
}

export default FormEditGallery;
