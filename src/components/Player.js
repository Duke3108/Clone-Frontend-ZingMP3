import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import moment from 'moment'
import { toast } from 'react-toastify'
import LoadingSong from './LoadingSong'

const {FaHeart,
    FaRegHeart,
    BsThreeDots,
    PiRepeatThin,
    MdSkipNext,
    MdSkipPrevious,
    PiShuffleThin,
    IoIosPlay,
    IoIosPause,
    PiRepeatOnceThin,
    BsMusicNoteList,
    SlVolume2,
    SlVolumeOff} = icons
var intervalId

const Player = ({setIsShowRightSidebar}) => {

    const {curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [audio, setAudio] = useState(new Audio())
    const [songInfo, setSongInfo] = useState(null)
    const [curSecond, setCurSecond] = useState(0)
    const [isShuffle, setIsShuffle] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)
    const [isLoadedSource, setIsLoadedSource] = useState(true)
    const [volume, setVolume] = useState(50)
    const [isHoverVolume, setIsHoverVolume] = useState(false)
    const dispatch = useDispatch()
    const thumbRef = useRef()
    const trackRef = useRef()
    const volumeRef = useRef()

    //get data nhac
    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoadedSource(false)
            const [res1,res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            setIsLoadedSource(true)
            if(res1.data.err === 0){
                setSongInfo(res1.data.data)
                dispatch(actions.setCurSongData(res1.data.data))
            }
            if(res2.data.err === 0){
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            }else{
                //audio.pause()
                //setAudio(new Audio())
                dispatch(actions.play(false))
                toast.warn(res2.data.msg)
                //setCurSecond(0)
                //thumbRef.current.style.cssText = `right: 100%`
                handleNextSong()
            }
        }
        fetchDetailSong()
    },[curSongId])

    //phat nhac
    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.pause()   
        audio.load()
        if(isPlaying ){
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime *10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurSecond(Math.round(audio.currentTime))
            }, 200);
        }
    }, [audio])

    //sau khi phat het nhac
    useEffect(() => {
        const handleEnded = () => {
            if(isShuffle){
                handleShuffle()
            }else if(repeatMode){
                repeatMode === 1 ? handleRepeatOne (): handleRepeatPlaylist()
            }else{
                handleNextSong()
            }
        }
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('ended',handleEnded)
        }
    },[audio, isShuffle, repeatMode])

    useEffect(() => {
        audio.volume = volume / 100
    },[volume])

    useEffect(() => {
        if(volumeRef.current){
            volumeRef.current.style.cssText = `right:${100 - volume}%`
        }
    },[volume])

    const handlePlayMuic = () => {
        if(isPlaying){
            audio.pause()
            dispatch(actions.play(false))
        }else{
            audio.play()
            dispatch(actions.play(true))
        }
    }

    const handleNextSong = () => {
        if(songs){
            let currentSongIndex 
            songs?.forEach((item, index) => {
                if(item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handlePrevSong = () => {
        if(songs){
            let currentSongIndex 
            songs?.forEach((item, index) => {
                if(item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
        dispatch(actions.play(true))
    }

    const handleRepeatOne = () => {
        audio.play()
    }

    const handleRepeatPlaylist = () => {
        if(songs){
            let currentSongIndex 
            songs?.forEach((item, index) => {
                if(item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(currentSongIndex === songs.length -1 ? songs[0].encodeId : songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleClickProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = percent * songInfo.duration / 100
        setCurSecond(Math.round(percent * songInfo.duration / 100))
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
        
        <div className='w-[40%] flex-auto flex items-center justify-center py-2 gap-2 flex-col'>
            <div className='flex gap-8 justify-center items-center'>
                <span 
                    className={`cursor-pointer ${isShuffle && 'text-purple-600'}`}
                    title='Bật phát ngẫu nhiên'
                    onClick={() => setIsShuffle(prev => !prev)}  
                    >
                    <PiShuffleThin size={24}/></span>
                <span 
                    className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}
                    onClick={handlePrevSong}>
                    <MdSkipPrevious size={24}/>
                </span>
                <span 
                    className='cursor-pointer p-1 border border-gray-500 hover:text-main-500 rounded-full'
                    onClick={handlePlayMuic}
                >
                    {!isLoadedSource ? <LoadingSong/> : isPlaying ? <IoIosPause size={24}/> : <IoIosPlay size={24}/>}
                </span>
                <span 
                    className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}
                    onClick={handleNextSong}
                >
                    <MdSkipNext size={24}/>
                </span>
                <span
                    className={`cursor-pointer ${repeatMode && 'text-purple-600'}`} 
                    title='Bật phát lại tất cả'
                    onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}    
                >
                     {repeatMode === 1 ? <PiRepeatOnceThin size={24}/> : <PiRepeatThin size={24} />}
                </span>
            </div>


            <div className='w-full flex items-center justify-center gap-3 text-xs'>
                <span> {moment.utc(curSecond * 1000).format('mm:ss')}</span>
                <div 
                    className='w-3/5 h-[3px] hover:h-[6px] relative rounded-l-full cursor-pointer rounded-r-full bg-[rgba(0,0,0,0.1)]'
                    onClick={handleClickProgressBar}
                    ref={trackRef}
                >
                    <div ref={thumbRef} className='absolute rounded-l-full rounded-r-full top-0 left-0 bottom-0 bg-[#0e8080]'></div>
                </div>
                <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
            </div>
        </div>

        <div className='w-[30%] hidden flex-auto min-[640px]:flex items-center justify-end gap-4 '>
            <div 
                className='flex gap-2 items-center'
                onMouseEnter={() => setIsHoverVolume(true)}
                onMouseLeave={() => setIsHoverVolume(false)}
            >
                <span onClick={() => setVolume(prev => +prev === 0 ?  70 : 0)}>{+volume === 0 ? <SlVolumeOff/> : <SlVolume2/>}</span>
                <div className={`w-[120px] h-[6px] bg-white rounded-l-full rounded-r-full ${isHoverVolume ? 'hidden' : 'relative'}`}>
                    <div ref={volumeRef} className='absolute left-0 bottom-0 top-0 bg-main-500 rounded-l-full rounded-r-full'></div>
                </div> 
                <input 
                    type='range' 
                    step={1} 
                    min={0} 
                    max={100} 
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className={`w-[120px] ${isHoverVolume ? 'inline' : 'hidden'}`}
                />
            </div>
            <span onClick={() => setIsShowRightSidebar(prev => !prev)} className='p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100'><BsMusicNoteList size={20}/></span>
        </div>

    </div>
  )
}

export default Player