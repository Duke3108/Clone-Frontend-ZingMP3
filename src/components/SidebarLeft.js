import React from 'react'
import logo from '../assets/logo_new.png'
import { sidebarMenu } from '../ultis/menu'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from '../ultis/path'
import DukeLogo from '../assets/Duke_logo.png'

const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center'
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center'

const SidebarLeft = () => {

  const navigate = useNavigate()
  return (
    <div className='flex flex-col h-full bg-main-200'>
      <div onClick={() => navigate(path.HOME)} className='w-full h-[70px] py-5 px-5 flex justify-start items-center cursor-pointer'>
        <img src={DukeLogo} alt='logo' className='w-[150px] h-[80px]'/>
      </div>
      <div className='flex flex-col'>
        {sidebarMenu.map(item => (
          <NavLink 
          to={item.path}
          key={item.path}
          end={item.end}
          className={({isActive}) => isActive ? activeStyle : notActiveStyle}
          >
            {item.icon}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SidebarLeft