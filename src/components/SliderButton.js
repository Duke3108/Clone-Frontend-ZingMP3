import React from 'react'

const SliderButton = ({icon, style, handleOnClick}) => {
  return (
    <button
        type='button'
        className={style ? style : 'py-1 px-4 rounded-l-full rounded-r-full border bg-transparent'}
        onClick={handleOnClick}
    >
        {icon}
    </button>
  )
}

export default SliderButton