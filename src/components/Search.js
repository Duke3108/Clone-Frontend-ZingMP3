import React from 'react'
import icons from '../ultis/icons'

const { FiSearch } = icons

const Search = () => {
  return (
    <div className='w-full flex items-center' >
      <span className='h-10 pl-4 flex bg-[#DDE4E4] rounded-l-[20px] items-center justify-center text-gray-500' >
        <FiSearch size={24}/>
        </span>
      <input
          type='text'
          className='outline-none bg-[#DDE4E4] px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-500'
          placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
      />
    </div>
  )
}

export default Search