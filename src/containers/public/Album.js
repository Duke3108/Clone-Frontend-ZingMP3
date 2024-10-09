import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Listsong } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Album = () => {

    const { title, pid } = useParams()
    const [playlistData, setPlaylistData] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDetailPlaylist(pid)
            if(response?.data.err === 0){
                setPlaylistData(response.data?.data)
                dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
            }
        }
        fetchDetailPlaylist()
    },[pid])
  return (
    
        <div className='flex gap-8 w-full h-full px-[60px]'>
        <div className='flex-none w-1/4 border border-red-500 flex flex-col items-center gap-2'>
            <img src={playlistData?.thumbnailM} alt='thumbnail' className='w-full object-contain rounded-md shadow-md'/>
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
        <Scrollbars style={{width: '100%', height: '80%'}}>
        <div className='flex-auto mb-40'>
            <span className='text-sm'>
                <span className='text-gray-600'>Lời tựa </span>
                <span>{playlistData?.sortDescription}</span>
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