import React from 'react'
import icons from '../ultis/icons'
import Search from './Search'
import { useNavigate, useParams } from 'react-router-dom'

const { FaArrowLeft, FaArrowRight }  = icons

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-between w-full items-center'>
        <div className='flex gap-6 w-full items-center'>
            <div className='flex gap-4 text-gray-400 cursor-pointer'>
              <span onClick={() => navigate(-1)}><FaArrowLeft size={24}/></span> 
              <span onClick={() => navigate(1)}><FaArrowRight size={24}/></span>
            </div>
            <div className='w-1/2'>
              <Search/>
            </div>
        </div>
        <div>
            Login
        </div>
    </div>
  )
}

export default Header
