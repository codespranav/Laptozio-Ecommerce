/* eslint-disable react/prop-types */
import { Select } from "antd";
const { Option } = Select;

const AddProductForm = ({
  categories,
  prodName,
  setProdName,
  prodDesc,
  setProdDesc,
  prodCat,
  cat, 
  setCat,
  setProdCat,
  actualPrice,
  setActualPrice,
  discountedPrice,
  setDiscountedPrice,
  prodQuantity,
  setProdQuantity,
  prodPhoto,
  setProdPhoto,
  handleClick,
  buttonTitle,
  isEditMode,
}
) => {
  const handleCategoryChange = (value, option) => {
    if (option) {
      const { children: categoryName } = option.props;
      setCat(categoryName);
      setProdCat(value);
    } else {
      setCat('');
      setProdCat('');
    }
  };
  return (
    <div>
      <div className="w-full">
        <form className="bg-white pt-4 pb-8 " onSubmit={handleClick}>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
              id="username"
              type="text"
              value={prodName}
              onChange={(e) => {
                setProdName(e.target.value);
              }}
              placeholder="Product Name"
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
              id="username"
              type="text"
              value={prodDesc}
              onChange={(e) => {
                setProdDesc(e.target.value);
              }}
              placeholder="Product Description"
            />

            <Select
              bordered={false}
              defaultValue= {"Select Category"}
              style={{ width: 470 }}
              value={prodCat}
              // onChange={(value) => {
              //   console.log("Selected Category:", value);
              //   setProdCat(value);
              //   // setCat(value)
              // }}
              onChange={handleCategoryChange}
              size="large"
              showSearch
              className="w-full my-4 shadow-lg"
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id} onChange = {()=>{setCat(c.name); console.log(cat)}}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
              id="username"
              type="text"
              value={actualPrice}
              onChange={(e) => {
                setActualPrice(e.target.value);
              }}
              placeholder="Actual Price"
            />

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
              id="username"
              type="text"
              value={discountedPrice}
              onChange={(e) => {
                setDiscountedPrice(e.target.value);
              }}
              placeholder="Discounted Price"
            />

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
              id="username"
              type="text"
              value={prodQuantity}
              onChange={(e) => {
                setProdQuantity(e.target.value);
              }}
              placeholder="Product Quantity"
            />

            <label className="bg-slate-500 w-full shadow appearance-none border rounded py-2 px-3 block text-center cursor-pointer">
              <input
                id="username"
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  setProdPhoto(e.target.files[0]);
                  console.log(prodPhoto);
                }}
                hidden
              />{" "}
              {prodPhoto ? prodPhoto.name : "Upload Photo"}
            </label>

            {prodPhoto ? (
              <div className="showphoto flex justify-center items-center">
                {isEditMode ? <img src= {prodPhoto} alt="" /> :<img src={URL.createObjectURL(prodPhoto)} alt="" />}
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline float-right"
            type="submit"
          >
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
