import icons from "./icons"

const { FaRegUser, MdExplore, FaChartPie, RiUserFollowLine } = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <FaRegUser size={24}/>
    },
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icon: <MdExplore size={24}/>
    },
    {
        path: 'chart',
        text: 'Chart',
        icon: <FaChartPie size={24}/>
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <RiUserFollowLine size={24}/>
    }
]