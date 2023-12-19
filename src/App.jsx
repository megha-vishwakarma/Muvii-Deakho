import React from "react"
import fetchDataFromApi from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigration} from "./features/homeSlice"


function App() {

  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)

  const apiCall = () => {
    fetchDataFromApi("/movie/popular")
    .then((data) => {console.log(data)
      dispatch(getApiConfigration(data))
    })
  }

  React.useEffect(() => {
    apiCall()
    
  }, [])

  return (
    <>
      <div >hello</div>
    </>
  )
}

export default App
