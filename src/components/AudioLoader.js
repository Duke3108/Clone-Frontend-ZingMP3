import React, { memo } from 'react'
import { Audio } from 'react-loader-spinner'

const AudioLoader = () => {
  return (
    <Audio
        height="40"
        width="40"
        radius="9"
        color="white"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
    />
  )
}

export default memo(AudioLoader) 