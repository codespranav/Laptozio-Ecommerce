/* eslint-disable react/prop-types */
const FormBox = ({value, setValue, handleClick, buttonTitle}) => {
  return (
  <div>
  <div className="w-full">
    <form className="bg-white pt-4 pb-8 "  onSubmit={handleClick} >
      <div className="mb-4">
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder="Category Name"/>
      </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline float-right" type="submit" >
          {buttonTitle}
        </button>
    </form>
  </div>
</div>
  )
}

export default FormBox
