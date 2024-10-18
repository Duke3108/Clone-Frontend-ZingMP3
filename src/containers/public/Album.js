import React, { useEffect, useState, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Listsong, AudioLoader } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import icons from '../../ultis/icons'

const Album = () => {

    const {isPlaying, sid } = useSelector(state => state.music)
    const {pid } = useParams()
    const [playlistData, setPlaylistData] = useState()
    const dispatch = useDispatch()
    const location = useLocation()
    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()
    const {FaRegHeart,BsThreeDots,IoIosPlay} = icons

    const handleHover = () => {
        setIsHover(true)
        imageRef.current.classList.add('animate-scale-up-image')
        imageRef.current.classList.remove('animate-scale-down-image')

    }

    const handleLeave = () => {
        setIsHover(false)
        imageRef.current.classList.remove('animate-scale-up-image')
        imageRef.current.classList.add('animate-scale-down-image')


    }
    //get data
    useEffect(() => {
        dispatch(actions.setCurPlaylistId(pid))
        const fetchDetailPlaylist = async () => {
            dispatch(actions.loadingPlaylist(true))
            const response = await apis.apiGetDetailPlaylist(pid)
            dispatch(actions.loadingPlaylist(false))
            if(response?.data.err === 0){
                setPlaylistData(response.data?.data)
                dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
            }
        }
        fetchDetailPlaylist()
    },[pid])

    //
    useEffect(() => {
        if(location.state?.playAlbum){
            dispatch(actions.setCurSongId(playlistData?.song?.items[0]?.encodeId))
            dispatch(actions.play(true))
        }
    }, [pid, playlistData])

    const handlePlayContinue = () => {
        if(isPlaying){
            dispatch(actions.play(false))
        }else{
            dispatch(actions.play(true))
        }
    }

  return (
    <div className='flex relative gap-8 w-full h-full px-[60px]'>
        <div className='flex-none w-1/4  flex flex-col items-center gap-2'>
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={(e) => {
                    e.stopPropagation()
                    handlePlayContinue()
                }}
                className='w-full relative overflow-hidden rounded-lg cursor-pointer'
            >
                <img 
                    ref={imageRef}
                    src={playlistData?.thumbnailM} 
                    alt='thumbnail' 
                    className= 'w-full object-contain shadow-md'
                />
                {isPlaying && <div className='absolute top-0 left-0 bottom-0 right-0 text-white flex items-center justify-center'>
                    <span className='p-3 border border-white rounded-full'><AudioLoader/></span>
                </div>}
                {!isPlaying && isHover && <div className='absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex items-center justify-center gap-7'>
                    <span><FaRegHeart size={20}/></span>
                    <span className='p-3 border border-white rounded-full'><IoIosPlay size={35}/></span>
                    <span><BsThreeDots size={20}/></span>
                </div>}
            </div>
            <div className='flex flex-col items-center gap-1'>
            <h3 className='text-[20px] font-bold text-gray-800'>{playlistData?.title}</h3>
            <span className='flex gap-2 items-center text-gray-500 text-xs'>
                <span>Cập nhật:</span>
                <span>
                    {moment.unix(playlistData?.contentLastUpdate).format("MM/DD/YYYY")}
                </span>
            </span>
            <span className='flex gap-2 items-center text-gray-500 text-xs'>{playlistData?.artistsNames}</span>
            <span className='flex gap-2 items-center text-gray-500 text-xs'>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>
            </div>
        </div>


        <Scrollbars autoHide style={{width: '100%', height: '100%'}}>
            <div className='flex-auto mb-40'>
                <span className='text-sm'>
                    {playlistData?.sortDescription}
                </span>
                <div>
                    <Listsong totalDuration={playlistData?.song?.totalDuration}/>
                </div>
            </div>
        </Scrollbars>
    </div>
    
  )
}

export default Album