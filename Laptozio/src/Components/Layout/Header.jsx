import { BeakerIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { ShoppingBagIcon , UserIcon} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/context";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const {auth} = useAuth();
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleLoginClick = ()=>{
    console.log(auth);
    if(auth.user == null){
      navigate('/login')
    }
    else{
      navigate(`/dashboard/${auth?.user?.role === 1 ? "user" : "admin"}`);
    }
  }

  const fetchCategories = async () => {
    try {
      // fetching data
      let res = await axios.get(
        "http://localhost:5000/api/category/categories"
      );
      setCategories(res.data); // Use res.data to access the response data
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line 
  }, []);
  return (
    <div className="shadow-md w-full sticky top-0 left-0 md:px-10 py-4 px-7 md:flex justify-between bg-white md:h-24 z-10">
      
        <div className="flex items-center cursor-pointer font-bold text-xl">
          <h2 className="md:text-3xl">Laptozio</h2>
          <BeakerIcon className="w-7 h-7 ms-2" />
        </div>


        {/* Menu Icon  */}
        <div className="w-7 h-7 md:hidden absolute right-8 top-4 cursor-pointer">
          <Bars3BottomRightIcon onClick={()=>{setVisible(!visible)}} />
        </div>
        
        <ul
          className={`md:flex items-center gap-5 transition-all ${
            visible ? "visible" : "hidden"
          }`}
        >


        <li className="my-7 md:my-0 hover:border-b-2 border-zinc-500">
                  <NavLink to = "/">Home</NavLink>
              </li>

        <li className="my-7 md:my-0 hover:border-b-2 border-zinc-500">
                  <NavLink to = "/products/laptop">Laptop</NavLink>
              </li>
        <li className="my-7 md:my-0 hover:border-b-2 border-zinc-500">
                  <NavLink to = "/products/Mobile">Mobile</NavLink>
              </li>
        <li className="my-7 md:my-0 hover:border-b-2 border-zinc-500">
                  <NavLink to = "/products/laptop">Accesories</NavLink>
        </li>
        <li className="my-7 md:my-0 hover:border-b-2 border-zinc-500">
                  <NavLink to = "/products/laptop">Write Us</NavLink>
        </li>
          
         

          {/* {
            auth.user?<button className="btn bg-gray-600 p-2 rounded-md text-white md:text-lg" onClick={handleSubMenu}>
            {" "}
            <NavLink to= {`/dashboard/${auth?.user?.role === 1 ? "user": "admin"}`} onClick={console.log(auth)}>Dashboard</NavLink>
            <div className={`${submenu? "visible" : "hidden"} absolute top-16 bg-gray-600 submenu`}>
              <ul className="w-[100px] h-10 flex items-center justify-center ">
                <li className="text-center" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </button>:
           <button className="btn bg-red-600 p-2 rounded-md text-white md:text-lg">
            {" "}
            <NavLink to="/login">Login</NavLink>
          </button>
          } */}
          
        </ul>

        <div className="user-controller flex flex-row items-center">
          <ul
            className={`md:flex items-center flex-row gap-5 transition-all ${
              visible ? "visible" : "hidden"
            }`}
          >
          <div className="flex items-center flex-row gap-5">
            <li className="my-7 md:my-0 cursor-pointer">
                <ShoppingBagIcon className="w-6 h-6" title="Cart"/>
          </li>

          {/* User Account Login  */}

            <li className="my-7 md:my-0 cursor-pointer" onClick={handleLoginClick}>
                <UserIcon className="w-6 h-6" title="Profile"/>
          </li>
          </div>
            
          </ul>
        </div>
      </div>
  );
};

export default Header;
