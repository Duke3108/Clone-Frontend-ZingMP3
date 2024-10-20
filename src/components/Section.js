import React, { memo } from 'react'
import SectionItem from './SectionItem'

const Section = ({data}) => {

    const number = data?.items?.length

  return (
    <div className='mt-[30px] px-[60px] flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
            <h3 className='text-[20px] font-bold'>{data?.title}</h3>
            {number>5 &&<span className='text-[14px] font-semibold text-black opacity-70 hover:text-main-500 cursor-pointer'>TẤT CẢ</span>}
        </div>

        <div className='flex gap-[28px]'>
            {data && data?.items?.length > 0 && data.items.filter((item, index) => index < 5)?.map(item => (
                <SectionItem
                    key={item.encodeId}
                    data={data}
                    title={item.title}
                    link={item.link}
                    sortDescription={item.sortDescription}
                    thumbnailM={item.thumbnailM}
                    artistsNames={item.artistsNames}
                />
            ))}
        </div>
       
    </div>
  )
}

export default memo(Section) 