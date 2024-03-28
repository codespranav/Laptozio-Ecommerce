/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import UserDashboard from './Pages/User/UserDashboard'
import { AdminRoute } from '../Routes/AdminRoute'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import { PrivateRoute } from '../Routes/PrivateRoute'
import Product from './Pages/Admin/Product'
import Category from './Pages/Admin/Category'
import ProductList from './Components/Products/ProductList'
import ConnectionLost from './Components/ConnectionLost'
import SingleProduct from './Pages/User/SingleProduct'
function App() {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  // const isUserOnline = ()=> {
  //   if(window.navigator.onLine){
  //     setUserOnline(true)
  //   }
  //   else{
  //     setUserOnline(false)
  //   }
  // }

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnlineStatus(window.navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);
  return (  

    onlineStatus? 
    <Routes>
        <Route path='/' element = {<Home/>}/>
        {/* Nested Routes  */}
        <Route path='/dashboard' element = {<PrivateRoute/>}>
            <Route path='user' element= {<UserDashboard/>}/>
        </Route>
        <Route path='/dashboard' element = {<AdminRoute/>}>
            <Route path='admin' element= {<AdminDashboard/>}/>
            <Route path='products' element= {<Product/>}/>
            <Route path='categories' element= {<Category/>}/>
        </Route>
        <Route path='/products/:category' element = {<ProductList/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='single-product/:productId' element= {<SingleProduct/>}/>
    </Routes> : <ConnectionLost/>
  )
}

export default App
