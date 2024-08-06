import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../../../Firebase'; 
import { MdDelete, MdOutlineSearch } from 'react-icons/md';
import ClipLoader from 'react-spinners/ClipLoader';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';

    const EtalaseTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Fetch etalase data
            const etalaseSnapshot = await getDocs(collection(db, 'etalase'));
            const fetchedData = [];
            etalaseSnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedData.push({ id: doc.id, ...data });
            });
            setData(fetchedData);
            setFilteredData(fetchedData);

            // Fetch products data
            const productsSnapshot = await getDocs(collection(db, 'products'));
            const fetchedProducts = [];
            productsSnapshot.forEach((doc) => {
            const productData = doc.data();
            fetchedProducts.push({ id: doc.id, ...productData });
            });
            setProducts(fetchedProducts);

        } catch (error) {
            console.error('Error fetching data: ', error);
            Swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan saat mengambil data.',
            icon: 'error'
            });
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const results = data.filter(etalase =>
        etalase.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(results);
    }, [searchTerm, data]);

    const confirmDelete = async (id) => {
        const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Kategori ini akan dihapus!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
        // Hapus dokumen dari Firestore
        try {
            await deleteDoc(doc(db, 'etalase', id));
            Swal.fire('Terhapus!', 'Kategori berhasil dihapus.', 'success');
            setData(data.filter(item => item.id !== id));
            setFilteredData(filteredData.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting document: ', error);
            Swal.fire('Error', 'Terjadi kesalahan saat menghapus kategori.', 'error');
        }
        }
    };

    return (
        <div className="p-4 rounded-md shadow-lg bg-white">
        <div className="mb-4 flex justify-end ">
            <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: "16px" }}
            InputProps={{
                endAdornment: <MdOutlineSearch />,
            }}
            />
        </div>
        <table className="table-auto w-full border-collapse">
            <thead>
            <tr>
                <th className="px-4 py-2 border-b">No</th>
                <th className="px-4 py-2 border-b">
                <div className="flex justify-between">
                    <p>Etalase</p>
                    <p>Operation</p>
                </div>
                </th>
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                <td colSpan="2" className="text-center">
                    <ClipLoader color="#0DCAF0" loading={loading} size={50} aria-label="Loading Spinner" />
                </td>
                </tr>
            ) : filteredData.length > 0 ? (
                filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((etalase, index) => (
                <tr key={etalase.id}>
                    <td className="px-4 py-2 border-b">{page * rowsPerPage + index + 1}</td>
                    <td className="px-4 py-2 border-b">
                    <div className="mb-4">
                        <div className="flex justify-between mb-4">
                        <h2 className="text-blue-500">{etalase.category}</h2>
                        <div className="flex gap-2">
                            {/* <ModalEdit data={etalase} /> */}
                            <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={() => confirmDelete(etalase.id)}
                            >
                            <MdDelete />
                            </button>
                        </div>
                        </div>
                        <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Thumbnail</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.filter(product => product.categ === etalase.category).length > 0 ? (
                            products.filter(product => product.categ === etalase.category).map((product, productIndex) => (
                                <tr key={product.id}>
                                <td className="px-4 py-2 border-b flex justify-center items-center">{productIndex + 1}</td>
                                <td className="px-4 py-2 border-b">
                                    <img
                                    className="h-14 w-14 "
                                    src={product.img}
                                    alt={product.name}
                                    />
                                </td>
                                <td className=" px-4 py-2 border-b text-blue-500">{product.name}</td>
                                <td className="px-4 py-2 border-b">{product.price}</td>
                                <td className="px-4 py-2 border-b">{product.stock}</td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No products available</td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="2" className="text-center">No data found</td>
                </tr>
            )}
            </tbody>
        </table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
            }}
        />
        </div>
    );
    };

    export default EtalaseTable;
