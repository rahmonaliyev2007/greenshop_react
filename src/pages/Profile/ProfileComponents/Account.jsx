import React from 'react'

export default function Account() {
    const { user } = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <form>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Fist Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={user?.name || ''} />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Last Name</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={user?.surname || ""} />
                    </label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Email Address</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="email" value={user?.email || ""} />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Phone</div>

                        <div className='w-full my-2 flex items-center group active:border-green-500 hover:border-green-500 transi focus:border-green-500 outline-none rounded-lg border bg-white'>
                            <div className='bg-[#FBFBFB] py-2 group-hover:border-r-green-500 transi rounded-l-lg px-3 border-r-2 font-semibold'>
                                +998
                            </div>
                            <input className='w-full outline-none rounded-r-lg py-2 px-3 bg-white' placeholder='phone number' type="text" value={user?.phone_number || ""} />
                        </div></label>
                </div>
                <div className='flex gap-3 justify-between items-center'>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '>*</span> Username</div>
                        <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={user?.username || ""} />
                    </label>
                    <label className='w-full my-3' >
                        <div className='font-semibold text-sm'> <span className='text-red-500 '></span> Photo</div>
                        <input className='w-1/2  my-2block py-2 px-3 rounded-lg border bg-white' type="file" />
                    </label>
                </div>
                <button className='bg-[#46A358] hover:bg-[#46A358]/80 text-white py-2 px-3 cursor-pointer rounded font-semibold'>Save Changes</button>
            </form>
        </div>
    )
}

