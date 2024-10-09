import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Section = () => {

    const { trending } = useSelector(state => state.app)
    const navigate = useNavigate()

  return (
    <div className='mt-12 px-[60px] flex flex-col gap-5'>
        <h3 className='text-[20px] font-bold'>{trending?.title}</h3>

        <div className='flex items-center justify-between gap-[28px]'>
            {trending && trending?.items?.length > 0 && trending.items.map(item => (
                <div
                    key={item.encodeId}
                    onClick={() => {
                        navigate(item?.link?.split('.')[0])
                    }}
                    className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'
                >
                        <img src={item.thumbnailM} alt='thumbnail' className='w-full h-auto rounded-lg'/>
                        <span>{`${item.sortDescription?.slice(0,40)}...`}</span>
                </div>
                
            ))}
        </div>
       
    </div>
  )
}

export default memo(Section) 