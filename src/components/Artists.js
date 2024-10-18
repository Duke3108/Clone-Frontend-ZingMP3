import React, {memo, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { handleNumber } from '../ultis/fn'
import icons from '../ultis/icons'

const {SlUserFollow,PiShuffleThin} = icons

const Artists = ({image,artistsNames,follow}) => {

    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()
    const navigate = useNavigate()

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

  return (
    <div className='w-1/5 flex flex-col gap-4'>
        <div
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className='relative overflow-hidden rounded-full cursor-pointer'
        >
            {isHover && <div className='absolute top-0 bottom-0 left-0 right-0 bg-overlay-30 z-50 rounded-full text-white flex items-center justify-center gap-7'>
                    <span onClick={(e) => {
                        e.stopPropagation()
                        
                    }} className='p-1 border border-white rounded-full'><PiShuffleThin size={35}/></span> 
            </div>}
            <img src={image} alt='avt' ref={imageRef} className='w-full object-contain rounded-full'/>
        </div>
        <div className='flex gap-1 flex-col items-center'>
            <span className='text-sm font-medium'>{artistsNames}</span>
            <span className='test-xs opacity-70'>{`${handleNumber(follow)} theo dõi`}</span>
            <button
                type='button'
                className='bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
            >
                <span><SlUserFollow size={16}/></span>
                <span className='text-sm opacity-70 font-semibold'>Theo dõi</span>
            </button>
        </div>
    </div>
  )
}

export default memo(Artists)