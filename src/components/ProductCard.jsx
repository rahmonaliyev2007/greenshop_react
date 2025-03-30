import axios from "axios";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API
const accessToken = JSON.parse(localStorage.getItem("user"))?.user?._id || '64bebc1e2c6d3f056a8c85b7';

const LikeFlower = async (route_path, flower_id, name, setIsLiked) => {
    try {
        const response = await axios.post(`${api}/user/create-wishlist?access_token=${accessToken}`, {
            route_path,
            flower_id
        });

        if (response.data.message === 'success') {
            toast.success(`${name} added to your wishlist! ❤️`);
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const updatedWishlist = [...wishlist, { route_path, flower_id }];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsLiked(true);
        } else {
            toast.error(`Failed to add ${name} to wishlist. ❌`);
        }
    } catch (error) {
        console.error("Wishlist error:", error);
        toast.error("Something went wrong while adding to wishlist.");
    }
};

export default function ProductCard({ data }) {
    if (!data) return;
    const { title: name, _id: id, main_image, price, discount_price, category: route_path, discount: isSale } = data;
    const Wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wish = Wishlist.some(item => item.flower_id === id);
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(wish);
    const [isInCart, setIsInCart] = useState(false);
    const handleLike = () => {
        if (isLiked) {
            toast.error("Removed from Wishlist 💔", { description: `${name} has been removed from your wishlist.` });
            const updatedWishlist = Wishlist.filter(item => item.flower_id !== id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsLiked(false);
        } else {
            LikeFlower(route_path, id, name, setIsLiked);
        }
    };

    const handleAddToCart = () => {
        toast.success("Added to Cart 🛒", { description: `${name} has been successfully added to your cart.` });
    };

    const handleCartClick = () => {
        if (isInCart) {
            toast.error("Removed from Cart 🗑️", { description: `${name} has been removed from your cart.` });
        } else {
            handleAddToCart();
        }
    };

    const calculateDiscountPercent = (originalPrice, discountedPrice) => {
        const discounted = Number(discountedPrice);
        if (!originalPrice || !discounted || originalPrice <= discounted) return 0;
        return Math.round(((originalPrice - discounted) / originalPrice) * 100);
    };

    const discountPercent = calculateDiscountPercent(price, discount_price);

    return (
        <div className="max-w-[300px] w-full border-t-2 border-t-transparent hover:border-t-[#46A358] transi group rounded">
            <div className="card_img relative transi rounded overflow-hidden ">
                <div onClick={() => navigate('/aboutProduct')} className="bg-[#FBFBFB] cursor-pointer transi w-full product_card_img max-sm:h-[250px] max-md:h-[200px] h-[275px] flex justify-center items-center">
                    <img width={250} height={250} priority src={main_image} alt={name} className="w-full h-auto object-contain mix-blend-multiply scale-100 group-hover:scale-110 transi" />
                </div>
                <div className="flex max-sm:hidden justify-center items-center absolute w-full bottom-0 transi gap-0.5 opacity-0 group-hover:opacity-100 group-hover:gap-3 group-hover:bottom-2">
                    <button onClick={handleCartClick} className={`p-2 hover:bg-gray-200 transi bg-white rounded cursor-pointer ${isInCart ? 'text-[#46A358]' : ''}`}>
                        <ShoppingCart size={19} fill={isInCart ? "#46A358" : "none"} />
                    </button>
                    <button onClick={handleLike} className={`p-2 hover:bg-gray-200 transi bg-white rounded cursor-pointer ${isLiked ? 'text-red-500' : ''}`}>
                        <Heart size={19} fill={isLiked ? "red" : "none"} />
                    </button>
                    <button onClick={() => navigate('/aboutProduct')} className="p-2 hover:bg-gray-200 hover:text-[#46A358] transi bg-white rounded cursor-pointer">
                        <Search size={19} />
                    </button>
                </div>
                <button onClick={handleLike} className={` sm:hidden absolute top-3 right-3 transi rounded cursor-pointer ${isLiked ? 'text-red-500' : ''}`}>
                    <Heart size={19} fill={isLiked ? "red" : "none"} />
                </button>
                {isLiked && <div className={`absolute transi rounded-bl max-md:hidden group-hover:opacity-100 group-hover:-top-7 group-hover:-right-10 ${isInCart ? 'opacity-0' : 'opacity-100'} top-0 right-0 bg-[#46A358] text-white text-sm px-2 py-1 font-bold`}>In your Wishlist</div>}
                {isInCart && <div className={`absolute opacity-100 rounded-bl transi group-hover:opacity-0 group-hover:-top-7 group-hover:-right-10 top-0 right-0 bg-[#46A358] text-white text-sm px-2 py-1 font-bold`}>In your Cart</div>}
                {isSale && <div className={`absolute opacity-100 max-sm:hidden rounded-br transi group-hover:opacity-0 sm:group-hover:-left-11 sm:group-hover:-top-5 top-0 left-0 bg-[#46A358] text-white px-2 py-[2px] font-bold`}>{discountPercent}% <span className="text-sm">OFF</span></div>}
            </div>
            <div>
                <h4 onClick={() => navigate('/aboutProduct')} className="font-bold cursor-pointer mt-4 group-hover:text-[#46A358] transi group-hover:mt-2 group-hover:mb-2">{name}</h4>
                {discountPercent !== 0 ? (
                    <p className="text-[#46A358] font-semibold">
                        ${Number(discount_price).toFixed(2)} <span className="line-through text-gray-400 text-xs group-hover:text-sm transi">${price.toFixed(2)}</span>
                    </p>
                ) : ( <p className="text-black font-semibold">${price.toFixed(2)}</p>)}
            </div>
        </div>
    );
}