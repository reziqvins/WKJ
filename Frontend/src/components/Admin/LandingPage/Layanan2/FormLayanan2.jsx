import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { db, storage } from '../../../../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';

const FormLayanan2 = () => {
  const [editor, setEditor] = useState();
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState(''); // State untuk menyimpan URL gambar yang sudah ada
  const [layananId, setLayananId] = useState('eyEL7sI0Hyk1A3tS2lcI'); // Set layananId dengan nilai yang ditentukan

  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'layanan2', layananId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Populate editor dengan data yang sudah ada
          editor.setData(data.content);
          setExistingImageUrl(data.imageUrl);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    if (editor) {
      fetchData();
    }
  }, [editor, layananId]);

  const handleImageChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setError('');
      console.log('File selected successfully');
    } else {
      setImage(null);
      setError('File must be in jpg/png format');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updateData = async (imageUrl) => {
      try {
        // Lakukan update data
        await updateDoc(doc(db, 'layanan2', layananId), {
          content: editor.getData(),
          imageUrl: imageUrl,
          updatedAt: new Date(),
        });

        // Reset form state after successful upload
        setImage(null);
        setError('');

        Swal.fire({
          icon: 'success',
          title: 'Data successfully updated!',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    if (image) {
      const storageRef = ref(storage, `layanan2-images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          setError(error.message);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          updateData(url);
        }
      );
    } else {
      updateData(existingImageUrl);
    }
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl mb-4 font-semibold">Edit Layanan</h2>
      <div className="mb-4">
        <label htmlFor="file" className="block text-gray-700 font-bold mb-2">Upload Gambar</label>
        <input type="file" id="file" onChange={handleImageChange} className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500" />
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
      <CKEditor
        editor={ClassicEditor}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
          setEditor(editor);
        }}
      />
      <button onClick={handleEdit} className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 mt-4">Simpan</button>
    </div>
  );
};

export default FormLayanan2;
