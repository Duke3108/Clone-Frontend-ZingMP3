import React, {useState} from 'react'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux'
import { useNavigate, createSearchParams } from 'react-router-dom'
import path from '../ultis/path'

const { FiSearch } = icons

const Search = () => {

  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = async (e) => {
    if(e.keyCode === 13){
      dispatch(actions.search(keyword))
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword
        }).toString()
      })
    }
  }

  return (
    <div className='w-full flex items-center' >
      <span className='h-10 pl-4 flex bg-[#DDE4E4] rounded-l-[20px] items-center justify-center text-gray-500' >
        <FiSearch size={24}/>
        </span>
      <input
          type='text'
          className='outline-none bg-[#DDE4E4] px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-500'
          placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyUp={handleSearch}
      />
    </div>
  )
}

export default Search