import React from 'react'
import { useSelector } from 'react-redux'
import { handleNumber } from '../../ultis/fn'
import {SongItem, SongList, SectionItem, Artists} from '../../components'

const SearchAll = () => {

  const { searchData } = useSelector(state => state.music)
  console.log(searchData)
  return (
    <div className='w-full flex flex-col px-[60px] gap-6'>
      
      <div className='flex flex-col w-full'>
        <h3 className='text-lg font-bold mb-5'>Nổi bật</h3>
        <div className='flex gap-8 '>
            {searchData?.top && <div className='p-[10px] cursor-pointer flex-1 bg-main-200 flex gap-8 items-center rounded-lg'>
                <img src={searchData.top.thumbnail} alt='avatar' className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType === 'artist' && 'rounded-full'}`}/>
                <div className='flex flex-col'>
                  <span className='mb-[6px]'>{searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                  <span className='text-sm font-semibold'>{searchData.top.title || searchData.top.name}</span>  
                  {searchData.top.objectType === 'artist' && <span>{handleNumber(searchData?.artists[0]?.totalFollow) + ' theo dõi'}</span>}
                </div>            
            </div>}
            {searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
              <div className='flex-1'>
                <SongItem
                  thumbnail={item.thumbnail}
                  sid={item.encodeId}
                  title={item.title}
                  artists={item.artistsNames}
                  size='w-[84px] h-[84px]'
                  style='bg-main-200'
                />
              </div> 
            ))}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <h3 className='text-lg font-bold mb-5'>Bài hát</h3>
        <div className='flex justify-between flex-wrap w-full'>
            {searchData?.songs?.filter((item, index) => index < 8)?.map(item => (
              <div key={item.encodeId} className='flex-auto w-full 1000:w-[45%]'>
                <SongList
                  songData={item}
                  isHideAlbum
                />
              </div> 
            ))}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <h3 className='text-lg font-bold mb-5'>Playlist/Album</h3>
        <div className='flex items-start justify-between gap-[28px]'>
            {searchData?.playlists?.filter((item, index) => index < 5)?.map(item => (
                <SectionItem
                  key={item.encodeId}
                  title={item.title}
                  link={item.link}
                  sortDescription={item.sortDescription}
                  thumbnailM={item.thumbnailM}
                  artistsNames={item.artistsNames}
                />
            ))}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <h3 className='text-lg font-bold mb-5'>Nghệ sĩ</h3>
        <div className='flex gap-[28px]'>
            {searchData?.artists?.filter((item, index) => index < 5)?.map(item => (
                <Artists
                  key={item.id}
                  image={item.thumbnailM}
                  artistsNames={item.name}
                  follow={item.totalFollow}
                  link={item.link}
                />  
            ))}
        </div>
      </div>


      <div className='w-full h-[100px]'></div>

    </div>
  )
}

export default SearchAll