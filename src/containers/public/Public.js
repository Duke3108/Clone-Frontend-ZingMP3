import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import { Player, SidebarLeft, SidebarRight, Header, LoadingPlaylist } from "../../components";
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector } from "react-redux";

const Public = () => {

    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)
    const { isLoadingPlaylist} = useSelector(state => state.music)
    const {curSongId} = useSelector(state => state.music)

    return (
        <div className="w-full relative h-screen flex flex-col bg-main-300">
            <div className="w-full h-full flex flex-auto">

                <div className="w-[70px] min-[1024px]:w-[240px] h-full flex-none">
                    <SidebarLeft/>
                </div>

                <div className="flex-auto flex flex-col relative">
                    {isLoadingPlaylist && <div className='absolute top-0 bottom-0 left-0 right-0 bg-main-200 z-20 flex items-center justify-center'>
                        <LoadingPlaylist/>
                    </div>}
                    <div className='h-[70px] flex-none px-[60px] z-50 flex items-center'>
                        <Header/>
                    </div>
                    <div className="flex-auto w-full">
                        <Scrollbars autoHide style={{width: '100%', height: '100%'}}>
                            <Outlet/>
                        </Scrollbars>
                    </div>    
                </div>

                {isShowRightSidebar && <div className="w-[330px] 1500:flex hidden h-screen flex-none animate-slide-left bg-main-200">
                    <SidebarRight/>
                </div>}
            </div>

            {curSongId &&<div className="fixed z-50 bottom-0 left-0 right-0 h-[90px]">
                <Player setIsShowRightSidebar={setIsShowRightSidebar} />
            </div>}
        </div>
        
    )
}

export default Public