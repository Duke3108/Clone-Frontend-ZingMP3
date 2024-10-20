import React, { useEffect } from 'react'
import { Listsong } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const SearchSongs = () => {
  const { searchData } = useSelector(state => state.music)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getSearchSongs(searchData?.top?.id))
  }, [searchData])
  return (
    <div className='w-full flex flex-col gap-4 mb-[100px] px-[60px]'>
      <h3 className='px-[16px] font-bold text-lg text-black'>Bài hát</h3>
      <Listsong isHideNoteIcon/>
    </div>
  )
}

export default SearchSongs