import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiGetArtist } from '../../apis'
import { SectionItem } from '../../components'

const SearchPlaylist = () => {

  const { searchData } = useSelector(state => state.music)
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetArtist(searchData?.top?.alias)
      if(res.data.err === 0){
        setPlaylists(res.data.data.sections[1])
      }
    }
    fetch()
  }, [searchData])

  return (
    <div className='w-full flex flex-col gap-1 px-[44px]'>
      <h3 className='px-[16px] font-bold text-lg text-black'>Playlist/Album</h3>
      <div className='flex flex-wrap mb-[100px]'>
            {playlists && playlists?.items?.length > 0 && playlists.items?.map(item => (
                <SectionItem
                    key={item.encodeId}
                    title={item.title}
                    link={item.link}
                    sortDescription={item.sortDescription}
                    thumbnailM={item.thumbnailM}
                    artistsNames={item.artistsNames}
                    search
                />
            ))}
        </div>
    </div>
  )
}

export default SearchPlaylist