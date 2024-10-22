import React, {useState} from 'react'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux'
import { useNavigate, createSearchParams, useParams } from 'react-router-dom'
import path from '../ultis/path'

const { FiSearch, GrClose } = icons

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
    <div className={`relative w-full flex items-center`} >
      {keyword && <span onClick={() => setKeyword('')} className='absolute right-4 cursor-pointer opacity-70'><GrClose/></span>}
      <span className={`bg-main-200 h-10 pl-4 flex rounded-l-[20px] items-center justify-center text-gray-500`} >
        <FiSearch size={24}/>
        </span>
      <input
          type='text'
          className={`bg-main-200 outline-none px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-500`}
          placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyUp={handleSearch}
      />
    </div>
  )
}

export default Search