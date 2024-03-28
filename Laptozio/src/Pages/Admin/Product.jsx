import MainLayout from '../../Components/Layout/MainLayout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import ProductTable from '../../Components/Products/ProductTable'

const Product = () => {
  return (
    <MainLayout>
          <div className="admin-dashboard-cont md:flex flex-row max-w-7xl mx-auto my-6">
      <div className="col-1">
        <AdminMenu/>
      </div>

      <div className="col-2 mx-6">
      <div className="content-area">
            <ProductTable/>
      </div>
      </div>
    </div>
    </MainLayout>
  )
}

export default Product
