/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import FormBox from "./FormBox";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/context";

const DataTable = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [createCatBoxOpen, setCreateCatBoxOpen] = useState(false)
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false)

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("")
  const [editedCatName, setEditedCatName] = useState("");
  const { auth, setAuth } = useAuth();

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(
        `http://localhost:5000/api/category/update-category/${selected._id}`,
        {
          name: editedCatName,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        toast.success("Edited");
        setIsBoxOpen(false);
        setSelected("");
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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

  const handleAddNewCategory = async (e)=> {
      e.preventDefault();
      try {
        let res = await axios.post(
          `http://localhost:5000/api/category/create-category/`,
          {
            name
          },
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        if (res.data.success) {
          toast.success("Category added");
          setCreateCatBoxOpen(false);
          fetchCategories();
        }
        else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error);
      }
  }

  const handleCatDelete = async ()=> {
    try {
      let res = await axios.delete(`http://localhost:5000/api/category/delete-category/${selected._id}`, {
        headers: {
          Authorization: auth.token
        }
      })
      if(res.data.success){
        toast.success(selected.name + " deleted successfully");
        setSelected('')
        setDeleteBoxOpen(false)
        fetchCategories()
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container max-w-7xl mx-auto mt-2">
      {/* Add Category Box  */}
      <div className="add-cat-box bg-gray-100 p-4 rounded-md mb-4">
        <div className="content-box md:flex justify-between items-center leading-10 md:leading-none">
          <p>Create New Category Here</p>
          <button
            className="button bg-red-600 md:p-2 p-2 rounded-md text-white md:text-base text-sm"
            title="Add new Category"
            onClick={()=> {setCreateCatBoxOpen(true)}}
          >
            Add New Category
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
                  <th
                    className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"
                    colSpan={3}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {categories.map((items) => (
                  <tr key={items._id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">{categories.indexOf(items) + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {items.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit...
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      <span>12/12/22</span>
                    </td>

                    {/* // Action Button */}
                    <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                      <PencilSquareIcon
                        className="w-5 text-gray-600 cursor-pointer"
                        onClick={() => {
                          setIsBoxOpen(true);
                          setSelected(items);
                          setEditedCatName(items.name);
                        }}
                      />
                    </td>
                    <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                      <TrashIcon className="w-5 text-red-600 cursor-pointer" onClick={()=>{
                        setSelected(items)
                        setDeleteBoxOpen(true)
                      }} />
                    </td>
                    <td className="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                      <EyeIcon className="w-5 text-blue-600 cursor-pointer" />
                    </td>
                  </tr>
                ))}
                <Modal
                  title="Edit Category"
                  open={isBoxOpen}
                  onCancel={() => {
                    setIsBoxOpen(false);
                  }}
                  footer = {null}
                >
                  <FormBox
                    value={editedCatName}
                    setValue={setEditedCatName}
                    handleClick={handleEdit}
                  />
                </Modal>

                <Modal
                  title = "Add new category"
                  open={createCatBoxOpen}
                  onCancel={() => {
                    setCreateCatBoxOpen(false);
                  }}
                  footer = {null}
                >
                  <FormBox
                  buttonTitle = "Create"
                    value={name}
                    setValue={setName}
                    handleClick={handleAddNewCategory}
                  />
                </Modal>

                <Modal
  open={deleteBoxOpen}
  title="Are you sure you want to delete?"
  onCancel={() => { setDeleteBoxOpen(false) }}
  footer={(_, { OkBtn, CancelBtn }) => (
    <>
      <CancelBtn />
      <Button className="button bg-blue-700 text-white" onClick={handleCatDelete}>Delete</Button>
    </>
  )}
/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
