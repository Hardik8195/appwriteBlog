import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth.js'
import { login,logout } from './store/authSlice';
import Header from './components/Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/index.js';

function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=> {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-col  bg-gray-400'>
      <div className='flex-grow'>
        <Header />
        <main>
        <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : null

}

export default App
