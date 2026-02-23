import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const DashBoard = () => {

  const fetchProtectedData = async ()=>{
    try {
      const response = await axiosInstance.get('/protected-view/')
      console.log("success: ", response.data);
    } catch (err) {
      console.error("error fetching data:", err);
    }
  }


  useEffect(() => {
    fetchProtectedData()
  }, [])
  return (
    <div>
      <h1 className='text-white text-center'>This is dashboard</h1>
    </div>
  )
}

export default DashBoard
