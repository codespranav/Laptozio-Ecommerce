import {NavLink} from 'react-router-dom'
import { ShoppingBagIcon, QueueListIcon, UsersIcon, BanknotesIcon, NewspaperIcon, PowerIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/context';


const AdminMenu = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate()
    const handleLogout = ()=> {
        localStorage.clear()
        setAuth({
            user: null,
            token: null
        })
        toast.success("Logout Successfully")
        navigate('/login')
    }
  return (
    <div>
        <div className="admin-menu">
            <div className="navigations">
                <ul className='flex flex-col w-72'>
                    <NavLink to= "/"  className= 'border-solid border-b-2 border-t-2 border-gray-100 p-4 m-1 flex gap-2 hover:bg-slate-200'><ShoppingBagIcon className='h-5 w-5 text-red-700'/> Dashboard</NavLink>

                    <NavLink to= "/dashboard/products" className= 'border-solid border-b-2 border-t-2 border-gray-100 p-4 m-1 flex gap-2 hover:bg-slate-200'><ShoppingBagIcon className='h-5 w-5 text-red-700'/> Products</NavLink>

                    <NavLink to= "/dashboard/categories" className= 'border-solid border-b-2 border-t-2 border-gray-100 p-4 m-1 flex gap-2 hover:bg-slate-200'><QueueListIcon className='h-5 w-5 text-red-700'/> Categories</NavLink>

                    <NavLink to= "/" className= 'border-solid border-b-2 border-t-2 border-gray-100 p-4 m-1 flex gap-2 hover:bg-slate-200'><UsersIcon className='h-5 w-5 text-red-700'/> Users</NavLink>

                    <NavLink to= "/" className= 'border-solid border-b-2 border-t-2 border-gray-100 p-4 m-1 flex gap-2 hover:bg-slate-200'><BanknotesIcon className='h-5 w-5 text-red-700'/> Orders</NavLink>

                    <NavLink to= "/" className= 'border-solid border-b-2 border-t-2 border-gray-100 p-4 m-1 flex gap-2 hover:bg-slate-200'> <NewspaperIcon className='h-5 w-5 text-red-700'/>Content</NavLink>

                    <NavLink onClick={handleLogout} to= "/" className= 'border-solid border-b-2 border-t-2 border-gray-100 p-4 m-1 flex gap-2 hover:bg-slate-200'> <PowerIcon className='h-5 w-5 text-red-700'/>Logout
                    </NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AdminMenu
