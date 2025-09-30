import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


function Table() {
  const [data,setData]=useState([])
  const [formshow,setformShow]=useState(false)
  const [id,setId]=useState(null)
  const [editId,setEditId]=useState(null)

  useEffect(()=>{
    // fetch('https://67ee3f32c11d5ff4bf78e01c.mockapi.io/0XUAZ')
    // .then(res=>res.json())
    // .then(data=>setData(data))
    axios.get('https://67f013232a80b06b8896cff8.mockapi.io/clothes/oxuaz')
    .then(res=>setData(res.data))
  },[])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">

      <div className="text-right ">
        <button
            onClick={()=>{setformShow(true)}}
            type="button"
            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
           Əlavə et
          </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>      
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item=>(
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.img}
                    alt={item.title}
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold line-clamp-2 overflow-ellipsis max-w-[200px]">{item.title}</div>
                    <div className="font-normal text-gray-500">
                      
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: item.description.slice(0,200) }}></td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{" "}
                      {
                        item.is_popular?'Popyular':'Normal'
                      }
                  </div>
                </td>
                <td onClick={()=>setEditId(item.id)} className="cursor-pointer px-6 py-4 font-medium text-blue-600 dark:text-blue-500">
                    Edit user
                </td>
                <td onClick={()=>setId(item.id)} className="cursor-pointer px-6 py-4 font-medium text-red-600 dark:text-blue-500">
                    Delete user
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* {formshow ? <AddXeber setformShow={setformShow} /> : ''} */}
      {formshow && <AddXeber setformShow={setformShow} setData={setData}/>}
      {id && <Delete id={id} setId={setId} setData={setData}/>}
      {editId && <Edit editId={editId} setEditId={setEditId} data={data} setData={setData}/>}

    </div>
  )
}

function AddXeber({setformShow,setData}){
  const obj={
    title:'',
    description:'',
    img:'',
    is_popular:false
  }
  const [yeniElan,setYeniElan]=useState(obj)

  function yukle(){
    setData(arr=>[yeniElan,...arr])
    setformShow(false)
  }

  return (
    <div onClick={()=>{setformShow(false)}} className="fixed inset-0 grid place-items-center bg-[#0000008e]">
      <form 
      onSubmit={(e)=>e.preventDefault()}
       onClick={(e)=>{e.stopPropagation()}} className="max-w-sm mx-auto bg-blue-950 p-5 w-[50%] rounded-2xl text-white">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium  dark:text-white"
          >
            Sekil elave et
          </label>
          <input
            onChange={(e)=>setYeniElan({...yeniElan,img:e.target.value})}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-blue-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sekil yukle"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Basliq elave et
          </label>
          <input
            onChange={(e)=>setYeniElan({...yeniElan,title:e.target.value})}
            type="text"
            id="password"
            className="bg-gray-50 border  text-blue-950 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="area"
            className=" block mb-2 text-sm font-medium dark:text-white"
          >
            Basliq elave et
          </label>
          <textarea
              onChange={(e)=>setYeniElan({...yeniElan,description:e.target.value})}
              id="area" className=" text-blue-950 rounded-lg w-full min-h-[100px] bg-white"></textarea>
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              onChange={(e)=>setYeniElan({...yeniElan,is_popular:e.target.checked})}
              id="remember"
              type="checkbox"
              defaultValue=""
              className=" text-blue-950 w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required=""
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium dark:text-gray-300"
          >
            Populyardir
          </label>
        </div>
        <button
          onClick={yukle}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

    </div>
  )
}

function Delete({id,setId,setData}){

  function sil(){
    setData(prev=>prev.filter(item=>item.id!=id))
    setId(null)
    toast.success('Silindi!')
  }

  return (
    <div onClick={()=>setId(null)} className="fixed inset-0 grid place-items-center bg-[#00000088]">
      <div onClick={(e)=>e.stopPropagation()} className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
        <h2 className="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current shrink-0 text-violet-400 dark:text-violet-600">
            <path d="M451.671,348.569,408,267.945V184c0-83.813-68.187-152-152-152S104,100.187,104,184v83.945L60.329,348.568A24,24,0,0,0,81.432,384h86.944c-.241,2.636-.376,5.3-.376,8a88,88,0,0,0,176,0c0-2.7-.135-5.364-.376-8h86.944a24,24,0,0,0,21.1-35.431ZM312,392a56,56,0,1,1-111.418-8H311.418A55.85,55.85,0,0,1,312,392ZM94.863,352,136,276.055V184a120,120,0,0,1,240,0v92.055L417.137,352Z"></path>
            <rect width="32" height="136" x="240" y="112"></rect>
            <rect width="32" height="32" x="240" y="280"></rect>
          </svg>Necessitatibus dolores quasi quae?
        </h2>
        <p className="flex-1 text-gray-400 dark:text-gray-600">Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.</p>
        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
          <button onClick={()=>setId(null)} className="cursor-pointer px-6 py-2 rounded-sm" fdprocessedid="yoxlwf">No</button>
          <button onClick={sil} className="cursor-pointer px-6 py-2 rounded-sm shadow-sm bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50" fdprocessedid="fa7dy">Yes</button>
        </div>
      </div>
    </div>
  )
}

function Edit({setData,data,editId,setEditId}){
    const obj=data.find(item=>item.id==editId)
    const [edited,setEdited]=useState(obj)

    function editEt(e){
        e.preventDefault()
        const ind=data.findIndex(item=>item.id===editId)
        setData(data.map((item,i)=>i==ind? edited : item))
        setEditId(null)
    }

    return (
    <div onClick={()=>{setEditId(null)}} className="fixed inset-0 grid place-items-center bg-[#0000008e]">
      <form 
       onClick={(e)=>{e.stopPropagation()}} className="max-w-sm mx-auto bg-blue-950 p-5 w-[50%] rounded-2xl text-white">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium  dark:text-white"
          >
            Sekil elave et
          </label>
          <input
            onChange={(e)=>setEdited({...edited,img:e.target.value})}
            value={edited.img}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-blue-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sekil yukle"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium dark:text-white"
          >
            Basliq elave et
          </label>
          <input
            onChange={(e)=>setEdited({...edited,title:e.target.value})}
            value={edited.title}
            type="text"
            id="password"
            className="bg-gray-50 border  text-blue-950 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="area"
            className=" block mb-2 text-sm font-medium dark:text-white"
          >
            Basliq elave et
          </label>
          <textarea
            onChange={(e)=>setEdited({...edited,description:e.target.value})}
            value={edited.description}
              id="area" className=" text-blue-950 rounded-lg w-full min-h-[100px] bg-white"></textarea>
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
            onChange={(e)=>setEdited({...edited,is_popular:e.target.checked})}
            defaultChecked={edited.is_popular}
              id="remember"
              type="checkbox"
              defaultValue=""
              className=" text-blue-950 w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required=""
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium dark:text-gray-300"
          >
            Populyardir
          </label>
        </div>
        <button
          onClick={editEt}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

    </div>
  )
}

export default Table
