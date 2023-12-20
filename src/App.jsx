import React from "react"
import fetchDataFromApi from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigration} from "./features/homeSlice"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import Details from "./pages/details/Details"
import SearchResult from "./pages/home/searchResult/SearchResult"
import ErrorSection from "./pages/404/ErrorSection"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
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
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/"  element = {<HomePage/>}/>
        <Route path="/:mediaType/:id"  element = {<Details/>}/>
        <Route path = "/search/:searchQuery" element = {<SearchResult/>}/>
        <Route path = "*" element = {ErrorSection}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
