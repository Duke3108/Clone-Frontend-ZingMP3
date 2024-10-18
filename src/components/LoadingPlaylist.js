import React, { memo } from 'react'
import { Triangle } from 'react-loader-spinner'

const LoadingPlaylist = () => {
  return (
    <Triangle
        visible={true}
        height="100"
        width="100"
        color="black"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
  )
}

export default memo(LoadingPlaylist)