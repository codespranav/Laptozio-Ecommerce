/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import FormBox from "../FormBox";
import { useAuth } from "../../contexts/context";
import AddProductForm from "./AddProductForm";
import { useNavigate } from "react-router-dom";


const ProductTable = () => {

  const navigate = useNavigate()
  const [createProdBoxOpen, setCreateProdBoxOpen] = useState(false)
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false)
  const [editMode, setIsEditMode] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");

  const [productName, setProductName] = useState("")
  const [productDesc, setProductDesc] = useState("")
  const [prodCat, setProdCat] = useState("")
  const [cat, setCat] = useState("")
  const [actualPrice, setActualPrice] = useState("")
  const [discountedPrice, setDiscountedPrice] = useState("")
  const [prodQuantity, setProdQuantity] = useState("")
  const [prodPhoto, setProdPhoto] = useState("")
  const { auth, setAuth } = useAuth();

  const fetchCategories = async () => {
    try {
      // fetching data
      let res = await axios.get(
        "http://localhost:5000/api/category/categories"
      );
      console.log(res.data.fetchCategories);
      setCategories(res.data.fetchCategories); // Use res.data to access the response data
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async ()=> {
    let {data} = await axios.get("http://localhost:5000/api/product/products");
    if(data){
        console.log(data);
        setProducts(data.data)
    }
  }
 
  const handleAddNewProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("product_name", productName);
      productData.append("product_desc", productDesc);
      productData.append("product_category", prodCat);
      productData.append("category", cat);
      productData.append("actual_price", actualPrice);
      productData.append("discounted_price", discountedPrice);
      productData.append("product_quantity", prodQuantity);
      productData.append("photo", prodPhoto); 
  
      
      if (parseFloat(discountedPrice) > parseFloat(actualPrice)) {
        toast.error("Discounted price cannot be greater than actual price");
      }
      else{
     
      let res = await axios.post(
        "http://localhost:5000/api/product/add-product",
        productData,
        {
          headers: {
            Authorization: auth.token,
            "Content-Type": "multipart/form-data", // Add this header for form data
          },
        }
      );
  
      if (res.data.success) {
        toast.success("Created");
        // Optionally, you can clear the input fields or close the modal here
        setProductName('')
        setProductDesc('')
        setProdCat('')
        setActualPrice('')
        setDiscountedPrice('')
        setProdQuantity('')
        fetchProducts();
        setProdPhoto('')
        setCreateProdBoxOpen(false)
      }
    }
    } catch (error) {
      toast.error("Internal server error");
      console.log(error);
    }
       
  };

  const updateProductHandler = async (e)=>{
    e.preventDefault();
    console.log(selected);
    try {
      const productData = new FormData();
      productData.append("product_name", productName);
      productData.append("product_desc", productDesc);
      productData.append("product_category", prodCat);
      productData.append("actual_price", actualPrice);
      productData.append("discounted_price", discountedPrice);
      productData.append("product_quantity", prodQuantity);
      productData.append("photo", prodPhoto); 

      let res = await axios.put(`http://localhost:5000/api/product/update-product/${selected}`, productData, {
        headers: {
          Authorization: auth.token,
          "Content-Type": "multipart/form-data",
        }
      });

      if(res.data.success){
        toast.success("Updated")
        navigate("/dashboard/products")
        setCreateProdBoxOpen(false)
        setSelected("")
        fetchProducts();
      }
      
    } catch (error) {
        console.log(error);
        toast.error('Something unexpected happened!')
    }
  }

  const handleProdDelete = async ()=> {
        try {
            let {data} = await axios.delete(`http://localhost:5000/api/product/delete-product/${selected}`, {
                    headers: {
                      Authorization: auth.token,
                    },
                })
            if(data.success){
                toast.success("Deleted")
                setSelected("")
                setDeleteBoxOpen(false)
                fetchProducts()
            }
        } catch (error) {
            toast.error("Something went wrong while processing, Kindly try again!");
            console.log(error);
        }
  }

  const handleEditForm = (items) => {
    setProductName(items.product_name);
    setProductDesc(items.product_desc);
    // const selectedCategory = { value: items.product_category?._id, label: "Category Label" }; // Modify this line based on your category structure
    setProdCat(items.product_category?._id);
    setActualPrice(items.actual_price);
    setDiscountedPrice(items.discounted_price);
    setProdQuantity(items.product_quantity);
    setProdPhoto(`http://localhost:5000/api/product/get-photo/${items._id}`); // You might need to fetch or set the product photo separately
    
    setIsEditMode(true);
    setCreateProdBoxOpen(true);
    setSelected(items);
  };

useEffect(() => {
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container max-w-7xl mx-auto mt-2">
      {/* Add Category Box  */}
      <div className="add-cat-box bg-gray-100 p-4 rounded-md mb-4">
        <div className="content-box md:flex justify-between items-center leading-10 md:leading-none">
          <p>List New Product Here</p>
          <button
            className="button bg-red-600 md:p-2 p-2 rounded-md text-white md:text-base text-sm"
            title="Add new Product"
            onClick={()=> {setCreateProdBoxOpen(true)}}
          >
            Add New Product
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Title
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Description
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Created_At
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Product Image
                  </th>
                  <th
                    className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"
                    colSpan={3}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {products.map((items) => (
                  <tr key={items._id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">{products.indexOf(items) + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {items.product_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <p>
                       {items.product_desc}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      <span>12/12/22</span>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <img src= {`http://localhost:5000/api/product/get-photo/${items._id}`} alt="" className="w-10" />
                    </td>

                    {/* // Action Button */}
                    <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                      <PencilSquareIcon
                        className="w-5 text-gray-600 cursor-pointer"
                        onClick={() => {
                          setIsEditMode(true)
                          setCreateProdBoxOpen(true)
                          handleEditForm(items)
                          setSelected(items._id);
                        }}
                      />
                    </td>
                    <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                      <TrashIcon className="w-5 text-red-600 cursor-pointer" onClick={()=>{
                        setSelected(items._id)
                        setDeleteBoxOpen(true)
                      }} />
                    </td>
                    <td className="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                      <EyeIcon className="w-5 text-blue-600 cursor-pointer" />
                    </td>
                  </tr>
                ))}

                <Modal
                  title = {!editMode ? "Add new Product" : "Update Product"}
                  open={createProdBoxOpen}
                  onCancel={() => {
                    setProductName('')
                    setProductDesc('')
                    setProdCat('')
                    setActualPrice('')
                    setDiscountedPrice('')
                    setProdQuantity('')
                    fetchProducts();
                    setProdPhoto('')
                    setCreateProdBoxOpen(false);
                    setIsEditMode(false)
                  }}
                  footer = {null}
                >
                  <AddProductForm
                    isEditMode = {editMode}
                    buttonTitle = {editMode ? "Update" : "Create"}

                    cat={cat}
                    setCat={setCat}
                    categories={categories}
                    setCategories={setCategories}

                    prodName={productName}
                    setProdName={setProductName}
                    prodDesc={productDesc}
                    setProdDesc={setProductDesc}
                    prodCat={prodCat}
                    setProdCat={setProdCat}
                    actualPrice={actualPrice}
                    setActualPrice={setActualPrice}
                    discountedPrice={discountedPrice}
                    setDiscountedPrice={setDiscountedPrice}
                    prodQuantity={prodQuantity}
                    setProdQuantity={setProdQuantity}
                    prodPhoto={prodPhoto}
                    setProdPhoto={setProdPhoto}

                    handleClick={editMode ? updateProductHandler : handleAddNewProduct}
                  />
                </Modal>

                <Modal>
                    open={deleteBoxOpen}
                    title={"Are you sure you want to delete"}
                    onCancel={() => { setDeleteBoxOpen(false) }}
                    footer={(_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <Button className="button bg-blue-700 text-white" onClick={handleProdDelete}>Delete</Button>
                      </>
                    )}
                </Modal>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
