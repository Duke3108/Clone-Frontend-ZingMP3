import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import  { Home, Login, Public, Personal, Album, Search, SearchSongs, SearchPlaylist, SearchAll, Singer }  from "./containers/public/";
import { Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import * as action from './store/actions'


function App() {
  const dispatch = useDispatch()
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)

  useEffect(()=>{
    dispatch(action.getHome())
  },[])

  const setWidth = (e) => {
    setCurrentWidth(e.target.innerWidth)
  }

  //set Width khi resize
  useEffect(() => {
    window.addEventListener('resize',setWidth)
    return () => {
      window.addEventListener('resize',setWidth)
    }
  },[])

  //truyen width cho cac page
  useEffect(() => {
    dispatch(action.setCurrentWidth(currentWidth))
  },[currentWidth])
  return (
    <>
    <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public/>}>
            <Route path={path.HOME} element={<Home/>} />
            <Route path={path.LOGIN} element={<Login/>} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album/>} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album/>} />
            <Route path={path.HOME__SINGER} element={<Singer/>} />
            <Route path={path.HOME_ARTIST__SINGER} element={<Singer/>} />
            <Route path={path.SEARCH} element={<Search/>}>
              <Route path={path.ALL} element={<SearchAll/>} />
              <Route path={path.SONG} element={<SearchSongs/>} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist/>} />
            </Route>

            <Route path={path.START} element={<Home/>} />
          </Route>
        </Routes>
    </div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
</>
  );
}

export default App;
