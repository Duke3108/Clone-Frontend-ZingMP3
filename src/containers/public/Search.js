import React from 'react'
import { Outlet } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars-2'

const Search = () => {
  return (
    <div className='w-full'>

        <div className='flex h-[50px] items-center text-sm border-b border-gray-500 pl-[60px] mr-2 mb-7 pb-1'>
            <h3 className='text-[24px] font-bold pr-6 border-r border-gray-500'>Kết Quả Tìm Kiếm</h3>
            <div className='flex items-center'>
              <span className='py-4 px-4 hover:text-main-500 font-semibold cursor-pointer'>TẤT CẢ</span>
              <span className='py-4 px-4 hover:text-main-500 font-semibold cursor-pointer'>BÀI HÁT</span>
              <span className='py-4 px-4 hover:text-main-500 font-semibold cursor-pointer'>PLAYLIST/ALBUM</span>
            </div>
        </div>

        <div className='w-full'>
          <Outlet/>
        </div>

    </div>
  )
}

export default Search