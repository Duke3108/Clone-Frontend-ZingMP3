import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis'
import icons from '../../ultis/icons'
import { Section, SongList, Artists } from '../../components'

const Singer = () => {

    const {IoIosPlay, SlUserFollow} = icons
    const { singer } = useParams()
    const [artistData, setArtistData] = useState(null)
    const [isHover, setIsHover] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const fetchArtistData = async () => {
            const res = await apiGetArtist(singer)
            if(res.data.err === 0){
                setArtistData(res.data.data)
            }
        }
        singer && fetchArtistData()
    }, [singer])

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [singer])

  return (
    <div className='flex flex-col mb-[120px] '>

       <div ref={ref} className='relative'>
            <div className='h-[300px] w-full  top-0 bottom-0 right-0 left-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent'>
                <div className='absolute flex gap-4 bottom-0 pb-6 px-[60px]'>
                    <img src={artistData?.thumbnail} alt='avt' className='rounded-full h-[140px] w-[140px]'/>
                    <div className='flex flex-col justify-start'>
                        <div className='flex items-center mb-3'>
                            <span className='text-[60px] font-bold'>{artistData?.name}</span>
                            <span 
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                className='relative h-[52px] w-[52px] p-2 ml-5 rounded-full bg-main-500 text-white cursor-pointer'>
                                {isHover && <span className='absolute top-0 bottom-0 left-0 right-0 bg-overlay-30 z-50 rounded-full'></span>}
                                <span className='absolute'><IoIosPlay size={40}/></span>
                            </span>
                            
                        </div>
                        
                        <div className='flex items-center gap-6'>
                            <span className='text-sm text-white'>
                                {`${Number(artistData?.totalFollow.toFixed(1)).toLocaleString()} người theo dõi`}
                            </span>
                            <button
                                type='button'
                                className='bg-main-500 px-6 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
                            >
                                <span><SlUserFollow size={16}/></span>
                                <span className='text-xs font-semibold'>THEO DÕI</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
       </div>

       <div className='mt-8 w-full flex flex-col px-[60px]'>
            <h3 className='mb-5 font-bold text-[20px]'>Bài hát nổi bật</h3>
            <div className='flex flex-wrap w-full justify-between'>
                {artistData?.sections?.find(item => item.sectionType === 'song')?.items?.filter((item, index) => index < 6)?.map(item => (
                    <div key={item.encodeId} className='flex-auto w-full 1000:w-[45%] mr-4'>
                        <SongList
                            songData={item}
                            isHideAlbum
                        />
                    </div> 
                ))}
            </div>
       </div>

        {artistData?.sections?.filter(item => item.sectionType === 'playlist')?.map((item, index) => (
            <Section key={index} data={item}/>
        ))}
        
        <div className='flex flex-col w-full px-[60px] mt-[30px]'>
            <h3 className='text-[20px] font-bold mb-5'>{artistData?.sections?.find(item => item.sectionType === 'artist')?.title}</h3>
            <div className='flex gap-[28px]'>
                {artistData?.sections?.find(item => item.sectionType === 'artist')?.items?.map(item => (
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

        <div className='px-[60px] mt-[30px]'>
            <h3 className='text-[20px] font-bold mb-5'>{artistData?.name}</h3>
            <div className='flex gap-8'>
                <img src={artistData?.thumbnailM} alt='thumbnail' className='w-[45%] h-[375px] flex-none object-contain rounded-md'/>
                <div className='flex flex-col gap-8 text-sm'>
                    <p dangerouslySetInnerHTML={{__html: artistData?.biography}}></p>
                    <div className='flex flex-col'>
                        <span className='text-[20px] font-bold'>{Number(artistData?.follow?.toFixed(1).toLocaleString())}</span>
                        <span className=''>Người theo dõi</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Singer