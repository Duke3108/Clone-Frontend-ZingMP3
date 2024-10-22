import { Section, Slider, NewRelease, LoadingPlaylist} from "../../components";
import { useSelector } from 'react-redux'

const Home = () => {

    const { trending, chill, top100, albumhot } = useSelector(state => state.app)

    return (
        <>
        {(trending && chill && top100 && albumhot) 
        ? <div className="overflow-y-auto w-full">
            <Slider/>
            <NewRelease/>
            <Section data={trending}/>
            <Section data={chill}/>
            <Section data={top100}/>
            <Section data={albumhot}/>
            <div className="w-full h-[150px]"></div>
        </div>

        : <div className="w-full h-full flex items-center justify-center">
            <LoadingPlaylist/>
        </div>}
        </>
    )
}

export default Home