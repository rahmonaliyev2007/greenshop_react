// import { useState } from "react";
// import { Badge, Popover } from "antd";
// import { useNavigate } from "react-router-dom";
// import {
//   SearchOutlined,
//   ShoppingCartOutlined,
//   MenuOutlined,
//   LoginOutlined,
//   BellOutlined,
// } from "@ant-design/icons";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="w-4/5 m-auto max-sm:w-full">
//       <div className="p-8 flex align-center border-b border-[#46A358]">
//         <div className="flex-1">Logo</div>
//         <div className="flex-1 flex justify-center gap-8 max-sm:hidden">
//           <h3 className="cursor-pointer" onClick={() => navigate("/")}>
//             Home
//           </h3>
//           <h3 className="cursor-pointer" onClick={() => navigate("/blog")}>
//             Blog
//           </h3>
//         </div>
//         <div className="flex-1 justify-end flex gap-8 max-sm:hidden">
//           <SearchOutlined className="cursor-pointer text-[20px]" />
//           <Popover
//             open={open}
//             title="Notifications"
//             trigger="click"
//             content={<div>Notification</div>}
//           >
//             <Badge className="mt-[5px]">
//               <BellOutlined className="cursor-pointer text-[23px]" />
//             </Badge>
//           </Popover>
//           <Badge className="mt-[5px]">
//             <ShoppingCartOutlined
//               onClick={() => navigate("/product-card")}
//               className="cursor-pointer text-[25px]"
//             />
//           </Badge>
//           <button className="bg-[#46A358] flex rounded-md w-24 items-center justify-center gap-1 h-9 text-base text-white cursor-pointer">
//             <LoginOutlined className="text-[20px]" />
//             Login
//           </button>
//         </div>
//         <div className="hidden flex-1 justify-end gap-8 max-sm:flex">
//           <SearchOutlined className="cursor-pointer text-[20px]" />
//           <Badge className="mt-[5px]">
//             <ShoppingCartOutlined
//               onClick={() => navigate("/product-card")}
//               className="cursor-pointer text-[25px]"
//             />
//           </Badge>
//           <MenuOutlined className="cursor-pointer text-[20px]" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client";

import { LogOut, Search, ShoppingCart, Heart, User, LogOutIcon } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import Login from "./auth/Login";
// import Register from "./auth/Register";
// import { useRouter } from "next/navigation";
// import useAuthStore from "@/store/authStore";
import { useState } from "react";
import { Modal } from 'antd';
// import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Auth from "../Auth";



export default function Navbar() {
  const { pathname } = useParams();
  const router = useNavigate();
  const { isLogged } = false;
  // const { user } = useAuthStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // const cartItems = useSelector((state) => state.cart.cart.length);
  // const likedItems = useSelector((state) => state.liked.liked.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "Plant Care", path: "/plantcare" },
  ];

  return (
    <nav className="top-0 sticky w-full z-50 bg-white">
      <div className="flex justify-between items-center max-w-[1240px] mx-auto py-5">
        <Link href="/" className="logo">
          <img src="/images/logo.svg" alt="logo" width={150} height={35} priority />
        </Link>
        <ul className="flex gap-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `py-[29px] border-b-2 transition-all ${isActive ? "border-[#46A358] text-[#46A358]" : "border-transparent hover:text-[#46A358]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <button className="cursor-pointer hover:text-[#46A358] transition-all"><Search size={24} /></button>
          <button className="relative cursor-pointer mx-6 hover:text-[#46A358] transition-all">
            <ShoppingCart size={24} />
            {/* {cartItems > 0 && (
                            <span className="absolute -top-3 -right-3 text-xs font-extrabold grid place-items-center text-white rounded-full border-3 border-white bg-[#46A358] w-[25px] h-[25px]">
                                {cartItems}
                            </span>
                        )} */}
          </button>

          <button type="button" onClick={showModal} className="bg-[#46A358] font-semibold hover:bg-[#46A358]/70 px-4 py-2 rounded-md text-white flex items-center gap-2 transition-all">
            <LogOutIcon size={16} className="font-semibold" /> Login
          </button>


          {isLogged ? (
            <div className="flex items-center gap-3">
              <button onClick={() => router.push("/profile/account")} className="bg-[#46A358] hover:bg-[#46A358]/70 px-4 py-2 rounded-md text-white flex items-center gap-2 transition-all">
                <User size={16} /> {user?.name || "User"}
              </button>
            </div>
          ) : (
            <div>
              {/* <Dialog>
                            <DialogTrigger onClick={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }} className="bg-[#46A358] hover:bg-[#46A358]/70 px-4 py-2 rounded-md text-white flex items-center gap-2 transition-all">
                                <LogOut size={16} /> Login
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <div className="w-full my-4 flex justify-center items-center gap-3 text-xl font-semibold">
                                    <button onClick={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }} className={`${isLoginOpen ? "text-[#46A358]" : ""}`}>Login</button>
                                    <div className="border-r-2 border-gray-300 h-4"></div>
                                    <button onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} className={`${!isLoginOpen ? "text-[#46A358]" : ""}`}>Register</button>
                                </div>
                                {isLoginOpen && <Login />}
                                {isRegisterOpen && <Register />}
                            </DialogContent>
                        </Dialog> */}
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[1280px] m-auto h-[2px] ">
        <hr className="bg-[#46a3597f] border-none w-full h-[2px]"></hr>
      </div>
      <Modal className="transi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>

        <div className="w-full my-4 flex justify-center items-center gap-3 text-xl font-semibold">
          <button onClick={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }} className={`${isLoginOpen ? "text-[#46A358]" : ""}`}>Login</button>
          <div className="border-r-2 border-gray-300 h-4"></div>
          <button onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} className={`${!isLoginOpen ? "text-[#46A358]" : ""}`}>Register</button>
        </div>
        <Auth isLoginOpen={isLoginOpen} isRegisterOpen={isRegisterOpen} />
      </Modal>
    </nav>
  );
}
