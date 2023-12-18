import React from "react"
import fetchDataFromApi from "./utils/api"



function App() {

  const apiCall = () => {
    fetchDataFromApi("/movie/popular")
    .then((data) => console.log(data))
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
