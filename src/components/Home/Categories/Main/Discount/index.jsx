import { memo } from "react";
import { Skeleton } from "antd";

const Discount = () => {
  return (
    <div className="mt-[20px] bg-[#d9fae0] w-full h-[300px] flex flex-col items-center">
      <h1 className="mt-[18px] text-[#46A358] text-4xl">
        <Skeleton.Input />
      </h1>
      <p className="mt-[11px] text-base font-bold">Discount</p>
      <img
        alt="discount"
        // src={}
        className="my-[10px] h-[180px]"
      />
    </div>
  );
};

export default memo(Discount);
