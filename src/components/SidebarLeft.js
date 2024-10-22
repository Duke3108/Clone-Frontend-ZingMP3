import React from 'react'
import { sidebarMenu } from '../ultis/menu'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from '../ultis/path'
import DukeLogo from '../assets/Duke_logo.png'
import smLogo from '../assets/Duke_smLogo.png'

const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center'
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center'

const SidebarLeft = () => {

  const navigate = useNavigate()
  return (
    <div className='flex flex-col h-full gap-4 bg-main-200'>
      <div onClick={() => navigate(path.HOME)} className='w-full h-[70px] min-[1024px]:py-5 min-[1024px]:px-5 flex min-[1024px]:justify-start justify-center items-center cursor-pointer'>
        <img src={DukeLogo} alt='logo' className='w-[150px] h-[80px] min-[1024px]:block hidden'/>
        <img src={smLogo} alt="smLogo" className='w-[50px] h-[50px] min-[1024px]:hidden object-cover'/>
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
            <span className='min-[1024px]:inline hidden'>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SidebarLeft