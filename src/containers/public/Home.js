import { Section, Slider, NewRelease} from "../../components";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Home = () => {

    const { trending, chill, top100, albumhot } = useSelector(state => state.app)

    return (
        <div className="overflow-y-auto w-full">
            <Slider/>
            <NewRelease/>
            <Section data={trending}/>
            <Section data={chill}/>
            <Section data={top100}/>
            <Section data={albumhot}/>
            <div className="w-full h-[150px]"></div>
        </div>
    )
}

export default Home