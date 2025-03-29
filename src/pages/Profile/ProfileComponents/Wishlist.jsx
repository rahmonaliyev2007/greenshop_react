import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../../../components/ProductCard';

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;
const accessToken = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN;

function Wishlist() {
    const [wishItems, setWishItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const topRef = useRef(null);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`${api}user/wishlist?access_token=${accessToken}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setWishItems(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    useEffect(() => {
        setCurrentPage(1)
        if (token) {
            fetchWishlist();
        }
    }, [token]);

    const totalPages = Math.ceil(wishItems.length / itemsPerPage);
    const visibleItems = wishItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div ref={topRef}>
            <div className='grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-5'>
                {visibleItems.map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>
            <div className="flex justify-center sm:justify-end items-center gap-2 mt-5">
                <button className="p-2 bg-gray-200 rounded disabled:opacity-40"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-[#46A358] text-white" : "bg-gray-200"}`}>
                        {i + 1}
                    </button>
                ))}
                <button className="p-2 bg-gray-200 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Wishlist;