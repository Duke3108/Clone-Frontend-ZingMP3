import React, { memo } from 'react'
import SectionItem from './SectionItem'

const Section = ({data}) => {
  return (
    <div className='mt-12 px-[60px] flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
            <h3 className='text-[27px] font-bold'>{data?.title}</h3>
            <span className='text-xs'>TẤT CẢ</span>
        </div>

        <div className='flex items-start justify-between gap-[28px]'>
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