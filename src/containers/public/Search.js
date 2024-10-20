import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { searchMenu } from '../../ultis/menu'
import { useSelector } from 'react-redux'

const Search = () => {

  const activeStyle = 'border-b-2 border-main-500 h-[52px] flex items-center text-main-500 py-4 px-4 hover:text-main-500 font-semibold cursor-pointer'
  const notActiveStyle = 'py-4 px-4 hover:text-main-500 font-semibold cursor-pointer'
  const {keyword} = useSelector(state => state.music)

  return (
    <div className='w-full'>

        <div className='flex  h-[50px] items-center text-sm border-b border-gray-500 pl-[60px] mr-2 mb-7 pb-1'>
            <h3 className='text-[24px] font-bold pr-6 border-r border-gray-500'>Kết Quả Tìm Kiếm</h3>
            <div className='flex items-center'>
              {searchMenu.map(item => (
                <NavLink
                  key={item.path}
                  to={`${item.path}?q=${keyword.replace(' ','+')}`}
                  className={({isActive}) => isActive ? activeStyle : notActiveStyle }
                >
                  {item.text}
                </NavLink>
              ))}
            </div>
        </div>

        <div className='w-full'>
          <Outlet/>
        </div>

    </div>
  )
}

export default Search