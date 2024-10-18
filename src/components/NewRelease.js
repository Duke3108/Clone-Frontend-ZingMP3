import React, { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import SongItem from './SongItem'

const NewRelease = () => {
  const { newRelease } = useSelector(state => state.app)
  const [isActived, setIsActived] = useState(0)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    isActived === 0 ? setSongs(newRelease?.items?.all) : isActived === 1 ? setSongs(newRelease?.items?.vPop) : setSongs(newRelease?.items?.others)
  },[isActived, newRelease])
  return (
    <div className='mt-12 px-[60px] flex flex-col gap-5'>

      <div className='flex items-center justify-between'>
        <h3 className='text-[20px] font-bold'>{newRelease?.title}</h3>
        <span className='text-xs'>TẤT CẢ</span>
      </div>

      <div className='flex items-center gap-5 text-xs'>
        <button
          type='button'
          onClick={() => setIsActived(0)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActived === 0 && 'bg-main-500 text-white'}`}
        >
          TẤT CẢ
        </button>
        <button
          type='button'
          onClick={() => setIsActived(1)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActived === 1 && 'bg-main-500 text-white'}`}
        >
          VIỆT NAM
        </button>
        <button
          type='button'
          onClick={() => setIsActived(2)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActived === 2 && 'bg-main-500 text-white'}`}
        >
          QUỐC TẾ
        </button>
      </div>  

      <div className='flex flex-wrap justify-between'>
        {songs?.filter((item, index) => index < 12 )?.map(item => (
          <div 
              key={item.encodeId} 
              className='w-[30%]'
          >
              <SongItem  
                thumbnail={item.thumbnail}
                title={item.title}
                artists={item.artistsNames} 
                releaseDate={item.releaseDate} 
                sid={item.encodeId}
              />
          </div>
            ))}
      </div>
    </div>
  )
}

export default memo(NewRelease)