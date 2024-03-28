import MainLayout from '../../Components/Layout/MainLayout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import DataTable from '../../Components/DataTable'

const Category = () => {
  return (
       <MainLayout>
          <div className="admin-dashboard-cont md:flex flex-row max-w-7xl mx-auto my-6">
      <div className="col-1">
        <AdminMenu/>
      </div>

      <div className="col-2 mx-6">
      <div className="content-area">
            <DataTable/>
      </div>
      </div>
    </div>
    </MainLayout>
  )
}

export default Category
