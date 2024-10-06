import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import  { Home, Login, Public, Personal }  from "./containers/public/";
import { Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import * as action from './store/actions'


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(action.getHome())
  },[])

  return (
    <>
    <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public/>}>
            <Route path={path.HOME} element={<Home/>} />
            <Route path={path.LOGIN} element={<Login/>} />
            <Route path={path.PERSONAL} element={<Personal/>} />

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
