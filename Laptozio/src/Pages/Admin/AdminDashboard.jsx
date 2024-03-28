/* eslint-disable no-unused-vars */
import React from 'react'
import MainLayout from "../../Components/Layout/MainLayout"
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../contexts/context'

const AdminDashboard = () => {
  const {auth} = useAuth()
  return (
    <MainLayout>
    <div className="admin-dashboard-cont md:flex flex-row max-w-7xl mx-auto my-6">
      <div className="col-1">
        <AdminMenu/>
      </div>

      <div className="col-2 my-3 mx-6">
      <div className="content-area">
          <div className="message-box ">
              <h1 className='my-4'>Welcome <span className='font-bold text-base'>{auth?.user?.name},</span></h1>
              <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
          </div>
      </div>
      </div>
    </div>
    </MainLayout>
  )
}

export default AdminDashboard
