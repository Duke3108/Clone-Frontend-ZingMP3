import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import { SlShuffle } from 'react-icons/sl'
import { GiPlayerPrevious } from 'react-icons/gi'

const {FaHeart,
    FaRegHeart,
    BsThreeDots,
    LuRepeat,
    MdSkipNext,
    MdSkipPrevious,
    PiShuffleThin,
    FaPlay,
    IoIosPause} = icons

const Player = () => {

    const audioEl = new Audio()
    const { curSongId, isPlaying } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [source, setSource] = useState(null)
    //const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1,res2] = await Promise.all([
                apis.getDetailSong(curSongId),
                apis.getSong(curSongId)
            ])
            if(res1.data.err === 0){
                setSongInfo(res1.data.data)
            }
            if(res2.data.err === 0){
                setSource(res2.data.data['128'])
            }
        }
        fetchDetailSong()
    },[curSongId])


    useEffect(() => {
        //audioEl.play()
    },[curSongId])

    const handlePlayMuic = () => {
       
    }

    return (
    <div className='bg-main-400 px-5 h-full flex'>
        <div className='w-[30%] flex-auto gap-3 flex items-center' >
            <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover rounded-md'/>
            <div className='flex flex-col'>
                <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                <span className='text-sm text-gray-500'>{songInfo?.artistsNames}</span>
            </div>
            <div className='flex gap-4 pl-2'>
                <span><FaRegHeart size={16}/></span>
                <span><BsThreeDots size={16}/></span>
            </div>
        </div>
        <div className='w-[40%] flex-auto border border-red-500 flex items-center justify-center py-2 gap-2 flex-col'>
            <div className='flex gap-8 justify-center items-center'>
                <span className='cursor-pointer' title='Bật phát ngẫu nhiên'><PiShuffleThin size={24}/></span>
                <span className='cursor-pointer'><MdSkipPrevious size={24}/></span>
                <span 
                className='cursor-pointer p-1 border border-gray-500 hover:text-main-500 rounded-full'
                onClick={handlePlayMuic}
                >
                    {isPlaying ? <IoIosPause size={24}/> : <FaPlay size={24}/> }
                </span>
                <span className='cursor-pointer'><MdSkipNext size={24}/></span>
                <span className='cursor-pointer' title='Bật phát lại tất cả'><LuRepeat size={24}/></span>
            </div>
            <div>
                process bar
            </div>
        </div>
        <div className='w-[30%] flex-auto border border-green-500'>
            Volume
        </div>
    </div>
  )
}

export default Player