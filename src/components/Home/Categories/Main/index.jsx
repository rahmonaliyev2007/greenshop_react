import { Slider } from "antd";
import Discount from "./Discount";

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API
const apikey = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import MainMapping from "../MainMapping";
import { useSearchParams } from "react-router-dom";

const fetchCategories = async () => {
    const { data } = await axios.get(`${api}flower/category?access_token=${apikey}`);
    return data;
};

const fetchSaleBanner = async () => {
    const { data: ad } = await axios.get(`${api}features/discount?access_token=${apikey}`);
    return ad;
};

const CategoriesMain = () => {

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });

    const { data: saleBanner, isLoading: isSaleLoading, error: saleError } = useQuery({
        queryKey: ["saleBanner"],
        queryFn: fetchSaleBanner,
    });

    const [price, setPrice] = useState([0, 1000]);
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');

    const updateSort = (category) => {
        searchParams.set('category', category)
        setSearchParams(searchParams)
    }

    const handleFilterApply = () => {
        searchParams.set('range_min', price[0]);
        searchParams.set('range_max', price[1]);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        const min = Number(searchParams.get("range_min")) || 0;
        const max = Number(searchParams.get("range_max")) || 1000;
        setPrice([min, max]);
    }, [searchParams]);

    return (
        <div className="max-w-[1240px] m-auto flex justify-between items-start gap-6 mt-10">
            <div className="w-[24%]  max-lg:hidden bg-[#FBFBFB] pt-4 rounded-xl overflow-hidden">
                <div className="px-3">
                    <h3 className="font-bold text-lg">Categories</h3>
                    {isLoading || isFetching || error ? (
                        <ul>
                            {[...Array(9)].map((_, i) => (
                                <li key={i} className="transi w-[88%] !rounded m-auto h-[20px] my-3 loading"></li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="transi">
                            {data?.data.map(({ id, title, route_path, count }) => (
                                <li key={id || route_path || title}
                                    onClick={() => updateSort(route_path)}
                                    className={`cursor-pointer ${route_path === category ? "text-[#46A358] font-semibold " : "hover:text-[#46A358] font-normal"} pl-4 transi flex justify-between items-center pr-2 my-2`} >
                                    {title} <span>({
                                        route_path === 'seeds' ? count + 1 :
                                            route_path === 'house-plants' ? count + 5 :
                                                route_path === 'potter-plants' ? count + 24 :
                                                    count}
                                        )</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mt-4 px-3">
                    <h2 className="font-semibold mb-2">Price Range</h2>
                    <div className="px-3">
                        <Slider range min={0} max={1000} step={1} value={price} trackStyle={[{ backgroundColor: "#46A358" }]} onChange={(value) => setPrice(value)} />
                    </div>
                    <p className="text-[#46A358] font-medium">Price: ${price[0]} – ${price[1]}</p>
                    <button onClick={handleFilterApply} className="cursor-pointer mt-2 px-4 py-2 font-semibold rounded-lg bg-[#46A358] text-white">Filter</button>
                </div>
                <ul className="mt-5 mb-10 px-3">
                    <li className="font-bold">Size</li>
                    <li><div className="flex justify-between text-sm items-center pl-2 text-gray-400 cursor-not-allowed pr-4 my-2"><p>Small</p> <span>(17)</span></div></li>
                    <li><div className="flex justify-between text-sm items-center pl-2 text-gray-400 cursor-not-allowed pr-4 my-2"><p>Medium</p> <span>(20)</span></div></li>
                    <li><div className="flex justify-between text-sm items-center pl-2 text-gray-400 cursor-not-allowed pr-4 my-2"><p>Large</p> <span>(14)</span></div></li>
                </ul>
                <div className="relative">
                    <img src="/images/SuperSaleBanner.svg" alt="greenshop sale banner" className="w-full h-auto mix-blend-multiply" />
                    {saleBanner?.data?.poster_image_url && saleBanner?.data?.discoount_up_to && (
                        <>
                            <p className="absolute top-[20%] w-full text-center font-semibold text-[23px] text-gray-600">UP TO {saleBanner?.data?.discoount_up_to}% OFF</p>
                            <img src={saleBanner.data.poster_image_url} alt="discount ad" className=" h-auto mix-blend-multiply absolute bottom-2 left-0" />
                        </>)}
                </div>
            </div>
            <MainMapping />
        </div>
    );
};

export default CategoriesMain;
